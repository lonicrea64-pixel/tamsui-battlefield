import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { getSiteById, sites, timeline } from "./data.js";
import { HttpError } from "./errors.js";

const siteIdSchema = z
  .string()
  .regex(/^[a-z0-9-]{3,40}$/i, "siteId must use 3-40 letters, numbers, or hyphens.");

const langSchema = z.enum(["zh-TW", "zh-CN", "en"]).optional();

const learningCheckSchema = z.object({
  siteId: siteIdSchema,
  answerId: z.string().min(1, "answerId is required.")
});

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "200kb" }));

  app.get("/api/v1/health", (_req, res) => {
    res.json({ data: { status: "ok", service: "tamsui-map-api" } });
  });

  app.get("/api/v1/sites", (req, res, next) => {
    try {
      const parsedLang = langSchema.safeParse(req.query.lang);
      if (!parsedLang.success) {
        throw new HttpError(400, "INVALID_QUERY", "lang must be one of zh-TW, zh-CN, or en.");
      }

      const summaries = sites.map((site) => ({
        id: site.id,
        name: site.name,
        shortDescription: site.shortDescription,
        coordinates: site.coordinates,
        mapPosition: site.mapPosition,
        tags: site.tags
      }));

      res.json({
        data: summaries,
        meta: {
          language: parsedLang.data ?? "zh-TW",
          total: summaries.length,
          generatedAt: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/v1/sites/:siteId", (req, res, next) => {
    try {
      const parsedSiteId = siteIdSchema.safeParse(req.params.siteId);
      if (!parsedSiteId.success) {
        throw new HttpError(400, "INVALID_SITE_ID", parsedSiteId.error.issues[0]?.message ?? "Invalid siteId.");
      }

      const site = getSiteById(parsedSiteId.data);
      if (!site) {
        throw new HttpError(404, "SITE_NOT_FOUND", "Site was not found.");
      }

      res.json({ data: site });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/v1/timeline", (_req, res) => {
    res.json({ data: timeline });
  });

  app.post("/api/v1/learning-check", (req, res, next) => {
    try {
      const parsed = learningCheckSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new HttpError(422, "INVALID_BODY", "Request body is invalid.", parsed.error.flatten());
      }

      const site = getSiteById(parsed.data.siteId);
      if (!site) {
        throw new HttpError(404, "SITE_NOT_FOUND", "Site was not found.");
      }

      const optionExists = site.quiz.options.some((option) => option.id === parsed.data.answerId);
      if (!optionExists) {
        throw new HttpError(422, "INVALID_ANSWER", "answerId does not match any option.");
      }

      const isCorrect = parsed.data.answerId === site.quiz.correctOptionId;
      res.json({
        data: {
          isCorrect,
          explanation: site.quiz.explanation,
          scoreDelta: isCorrect ? 10 : 0,
          nextStep: isCorrect
            ? {
                action: "visit-nearby-site",
                siteId: site.nextSiteId,
                message: "答對了，前往下一個相關地點。"
              }
            : {
                action: "open-timeline",
                message: "再查看時間線與因果說明。"
              }
        }
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((_req, _res, next) => {
    next(new HttpError(404, "NOT_FOUND", "Route was not found."));
  });

  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({
        error: {
          code: error.code,
          message: error.message,
          details: error.details ?? null
        }
      });
      return;
    }

    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected server error.",
        details: null
      }
    });
  });

  return app;
}
