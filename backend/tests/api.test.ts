import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";

const app = createApp();

describe("tamsui-map-api", () => {
  it("GET /api/v1/sites returns summaries", async () => {
    const response = await request(app).get("/api/v1/sites");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toHaveProperty("id");
    expect(response.body.data[0]).not.toHaveProperty("quiz");
  });

  it("GET /api/v1/sites/:siteId handles invalid id", async () => {
    const response = await request(app).get("/api/v1/sites/abc_def");

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("INVALID_SITE_ID");
  });

  it("POST /api/v1/learning-check returns immediate feedback", async () => {
    const response = await request(app).post("/api/v1/learning-check").send({
      siteId: "hobe-fort",
      answerId: "a"
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      isCorrect: true,
      scoreDelta: 10
    });
    expect(response.body.data.nextStep.action).toBe("visit-nearby-site");
  });

  it("POST /api/v1/learning-check rejects answer outside option list", async () => {
    const response = await request(app).post("/api/v1/learning-check").send({
      siteId: "hobe-fort",
      answerId: "z"
    });

    expect(response.status).toBe(422);
    expect(response.body.error.code).toBe("INVALID_ANSWER");
  });
});
