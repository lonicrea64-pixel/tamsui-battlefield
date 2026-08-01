import { LearningFeedback, SiteDetail, SiteSummary, TimelineEvent } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api/v1";

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = "UNKNOWN_ERROR", status = 500) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

async function fetchJson<T>(path: string, options: RequestInit = {}, timeoutMs = 3000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {})
      }
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new ApiError(payload?.error?.message ?? "請求失敗", payload?.error?.code, response.status);
    }

    return payload.data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("系統回應超時，請稍後再試", "REQUEST_TIMEOUT", 408);
    }

    throw new ApiError("網路異常，請檢查連線", "NETWORK_ERROR", 503);
  } finally {
    clearTimeout(timer);
  }
}

export function getSiteSummaries() {
  return fetchJson<SiteSummary[]>("/sites");
}

export function getSiteDetail(siteId: string) {
  return fetchJson<SiteDetail>(`/sites/${siteId}`);
}

export function getTimeline() {
  return fetchJson<TimelineEvent[]>("/timeline");
}

export function submitLearningCheck(siteId: string, answerId: string) {
  return fetchJson<LearningFeedback>("/learning-check", {
    method: "POST",
    body: JSON.stringify({ siteId, answerId })
  });
}
