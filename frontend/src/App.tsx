import { useEffect, useMemo, useState } from "react";

import { InteractiveMap } from "./components/InteractiveMap";
import { SitePanel } from "./components/SitePanel";
import { TimelinePanel } from "./components/TimelinePanel";
import { ApiError, getSiteDetail, getSiteSummaries, getTimeline, submitLearningCheck } from "./services/api";
import { LearningFeedback, SiteDetail, SiteSummary, TimelineEvent } from "./types";

export function App() {
  const [sites, setSites] = useState<SiteSummary[]>([]);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [selectedSiteId, setSelectedSiteId] = useState<string>();
  const [siteDetail, setSiteDetail] = useState<SiteDetail>();
  const [selectedAnswerId, setSelectedAnswerId] = useState("");
  const [feedback, setFeedback] = useState<LearningFeedback>();
  const [bootLoading, setBootLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [responseTimeMs, setResponseTimeMs] = useState<number>();
  const [errorMessage, setErrorMessage] = useState("");

  const selectedSiteName = useMemo(() => sites.find((site) => site.id === selectedSiteId)?.name, [sites, selectedSiteId]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setBootLoading(true);
        setErrorMessage("");
        const [siteItems, timelineItems] = await Promise.all([getSiteSummaries(), getTimeline()]);
        setSites(siteItems);
        setTimeline(timelineItems);
        if (siteItems.length > 0) {
          setSelectedSiteId(siteItems[0].id);
        }
      } catch (error) {
        setErrorMessage((error as ApiError).message ?? "初始化資料載入失敗");
      } finally {
        setBootLoading(false);
      }
    };

    void loadInitialData();
  }, []);

  useEffect(() => {
    const loadDetail = async () => {
      if (!selectedSiteId) {
        return;
      }

      try {
        setDetailLoading(true);
        setSelectedAnswerId("");
        setFeedback(undefined);
        setErrorMessage("");

        const started = performance.now();
        const detail = await getSiteDetail(selectedSiteId);
        setSiteDetail(detail);
        setResponseTimeMs(Math.round(performance.now() - started));
      } catch (error) {
        setErrorMessage((error as ApiError).message ?? "戰場資料載入失敗");
      } finally {
        setDetailLoading(false);
      }
    };

    void loadDetail();
  }, [selectedSiteId]);

  const handleSubmitAnswer = async () => {
    if (!selectedSiteId || !selectedAnswerId) {
      return;
    }

    try {
      setErrorMessage("");
      const result = await submitLearningCheck(selectedSiteId, selectedAnswerId);
      setFeedback(result);
    } catch (error) {
      setErrorMessage((error as ApiError).message ?? "提交答案失敗");
    }
  };

  const handleGotoSite = (siteId: string) => {
    setSelectedSiteId(siteId);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Tamsui Historical Map MVP</p>
        <h1>淡水古戰場互動地圖</h1>
        <p>
          給想了解歷史與淡水的人：在地圖上點一個古戰場點位，3 秒內拿到重點脈絡與下一步探索建議。
        </p>
      </header>

      {errorMessage ? (
        <p className="error-banner" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {bootLoading ? (
        <main className="content-grid">
          <section className="map-panel">
            <h2>載入中...</h2>
          </section>
          <section className="detail-panel">
            <h2>準備資料中...</h2>
          </section>
        </main>
      ) : (
        <>
          <main className="content-grid">
            <InteractiveMap sites={sites} selectedSiteId={selectedSiteId} onSelectSite={setSelectedSiteId} />
            <SitePanel
              site={siteDetail}
              isLoading={detailLoading}
              answerId={selectedAnswerId}
              feedback={feedback}
              responseTimeMs={responseTimeMs}
              onAnswerChange={setSelectedAnswerId}
              onSubmit={handleSubmitAnswer}
              onGotoSite={handleGotoSite}
            />
          </main>

          <footer className="guide-panel">
            <h2>本次核心操作結果</h2>
            <p>
              目前選擇：<strong>{selectedSiteName ?? "尚未選擇"}</strong>
            </p>
            <p>下一步：先完成該點位測驗，再切換到推薦點位或對照時間線。</p>
          </footer>

          <TimelinePanel events={timeline} />
        </>
      )}
    </div>
  );
}
