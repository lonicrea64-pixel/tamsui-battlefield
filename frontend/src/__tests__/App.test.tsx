import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../App";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

function installSuccessFetchMock() {
  const mockFetch = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();

    if (url.endsWith("/sites")) {
      return jsonResponse({
        data: [
          {
            id: "hobe-fort",
            name: "滬尾礮臺",
            shortDescription: "核心火力點",
            coordinates: { lat: 25.1739, lng: 121.4328 },
            mapPosition: { xPercent: 42, yPercent: 45 },
            tags: ["炮台"]
          }
        ]
      });
    }

    if (url.endsWith("/timeline")) {
      return jsonResponse({
        data: [
          {
            id: "evt-1",
            date: "1884-10-08",
            title: "淡水戰役",
            description: "法軍登陸受挫"
          }
        ]
      });
    }

    if (url.endsWith("/sites/hobe-fort")) {
      return jsonResponse({
        data: {
          id: "hobe-fort",
          name: "滬尾礮臺",
          shortDescription: "核心火力點",
          coordinates: { lat: 25.1739, lng: 121.4328 },
          mapPosition: { xPercent: 42, yPercent: 45 },
          tags: ["炮台"],
          historicalContext: "1884 年淡水防線核心",
          keyFacts: ["戰役關鍵日：1884-10-08"],
          quiz: {
            question: "主要作用？",
            options: [
              { id: "a", label: "主要火力點" },
              { id: "b", label: "補給基地" }
            ],
            correctOptionId: "a",
            explanation: "炮台負責關鍵火力。"
          },
          nextSiteId: "shalun-landing"
        }
      });
    }

    if (url.endsWith("/learning-check") && init?.method === "POST") {
      return jsonResponse({
        data: {
          isCorrect: true,
          explanation: "回答正確",
          scoreDelta: 10,
          nextStep: {
            action: "visit-nearby-site",
            siteId: "shalun-landing",
            message: "下一步探索推薦點位"
          }
        }
      });
    }

    return jsonResponse({ error: { message: "not found" } }, 404);
  });

  vi.stubGlobal("fetch", mockFetch);
  return mockFetch;
}

afterEach(() => {
  vi.unstubAllGlobals();
  cleanup();
});

describe("App", () => {
  it("renders homepage with map and timeline", async () => {
    installSuccessFetchMock();

    render(<App />);

    await screen.findByRole("button", { name: "查看 滬尾礮臺" });
    expect(screen.getByText("淡水戰役")).toBeTruthy();
    expect(screen.getByText("1884-10-08")).toBeTruthy();
  });

  it("completes core operation and shows next step", async () => {
    installSuccessFetchMock();
    const user = userEvent.setup();

    render(<App />);

    await screen.findByText("主要作用？");

    await user.click(screen.getByLabelText("主要火力點"));
    await user.click(screen.getByRole("button", { name: "送出答案" }));

    await screen.findByRole("heading", { name: "回答正確" });
    expect(screen.getByText("下一步探索推薦點位")).toBeTruthy();
    expect(screen.getByRole("button", { name: "前往下一個推薦點位" })).toBeTruthy();
  });

  it("shows understandable error when api fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse({ error: { message: "後端服務暫時不可用", code: "SERVICE_DOWN" } }, 503))
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toContain("後端服務暫時不可用");
    });
  });
});
