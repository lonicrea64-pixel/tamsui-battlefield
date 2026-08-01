import { FormEvent } from "react";

import { LearningFeedback, SiteDetail } from "../types";

interface SitePanelProps {
  site?: SiteDetail;
  isLoading: boolean;
  answerId: string;
  feedback?: LearningFeedback;
  responseTimeMs?: number;
  onAnswerChange: (answerId: string) => void;
  onSubmit: () => void;
  onGotoSite: (siteId: string) => void;
}

export function SitePanel({
  site,
  isLoading,
  answerId,
  feedback,
  responseTimeMs,
  onAnswerChange,
  onSubmit,
  onGotoSite
}: SitePanelProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  if (isLoading) {
    return (
      <section className="detail-panel" aria-live="polite">
        <h2>載入戰場資料中...</h2>
      </section>
    );
  }

  if (!site) {
    return (
      <section className="detail-panel" aria-live="polite">
        <h2>請先選擇一個古戰場點位</h2>
      </section>
    );
  }

  const nextSiteId = feedback?.nextStep.siteId;

  return (
    <section className="detail-panel" aria-live="polite">
      <h2>{site.name}</h2>
      <p className="context">{site.historicalContext}</p>

      <div className="fact-grid">
        {site.keyFacts.map((fact) => (
          <article key={fact}>
            <p>{fact}</p>
          </article>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="quiz-form">
        <h3>{site.quiz.question}</h3>
        {site.quiz.options.map((option) => (
          <label key={option.id}>
            <input
              type="radio"
              name="quiz-option"
              value={option.id}
              checked={answerId === option.id}
              onChange={() => onAnswerChange(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}

        <button type="submit" disabled={!answerId}>
          送出答案
        </button>
      </form>

      {typeof responseTimeMs === "number" ? <p className="timing">本次資料回應時間：約 {responseTimeMs} ms</p> : null}

      {feedback ? (
        <article className={`feedback ${feedback.isCorrect ? "ok" : "warn"}`}>
          <h3>{feedback.isCorrect ? "回答正確" : "再試一次"}</h3>
          <p>{feedback.explanation}</p>
          <p>{feedback.nextStep.message}</p>
          {feedback.nextStep.action === "visit-nearby-site" && nextSiteId ? (
            <button type="button" onClick={() => onGotoSite(nextSiteId)}>
              前往下一個推薦點位
            </button>
          ) : null}
        </article>
      ) : null}
    </section>
  );
}
