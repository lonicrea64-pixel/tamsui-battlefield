"use client";

import { BookOpen, Camera, CircleAlert, ExternalLink, ImageOff, UserRound, X } from "lucide-react";

import { battleEvents } from "@/data/battleData";
import { HistoricalLocation, HistoricalPerson, MapMode } from "@/types/historical";

interface InfoPanelProps {
  location: HistoricalLocation | null;
  personContext: HistoricalPerson | null;
  mode: MapMode;
  onClose: () => void;
  onSelectRelatedEvent: (eventId: string) => void;
}

function accuracyLabel(location: HistoricalLocation) {
  if (location.accuracy === "verified") return "現址可確認";
  if (location.accuracy === "documented-area") return "文獻確認範圍";
  return "研究推定位置";
}

export default function InfoPanel({ location, personContext, mode, onClose, onSelectRelatedEvent }: InfoPanelProps) {
  if (!location) return null;
  const isModern = mode === "modern";
  const relatedPersonPlace = personContext?.relatedPlaces.find((place) => place.locationId === location.id);

  return (
    <aside className="info-panel" aria-label={`${location.title}資料`}>
      <header className="info-header">
        <div>
          <p>{isModern ? "今日史蹟" : location.ancientName}</p>
          <h2>{isModern ? location.modernName ?? location.title : location.title}</h2>
          <span>{isModern ? location.modernStatus : location.modernName}</span>
        </div>
        <button type="button" onClick={onClose} aria-label="關閉地點資料">
          <X size={18} />
        </button>
      </header>

      <div className="info-scroll">
        {isModern && location.todayPhoto ? (
          <figure className="site-photo">
            <img src={location.todayPhoto.src} alt={location.todayPhoto.alt} />
            <figcaption>
              <span>{location.todayPhoto.caption}</span>
              <a href={location.todayPhoto.sourceUrl} target="_blank" rel="noreferrer">
                <Camera size={13} />{location.todayPhoto.credit}<ExternalLink size={12} />
              </a>
            </figcaption>
          </figure>
        ) : (
          <div className="image-placeholder" aria-label={`${location.imageCaption}影像資料`}>
            <ImageOff size={23} />
            <span>{isModern ? "現況影像連結" : "此處尚無可供辨識的影像"}</span>
            <small>{isModern ? location.imageCaption : `${location.imageCaption}；以史料定位與文字說明呈現`}</small>
            {isModern && location.modernPhotoUrl ? (
              <a href={location.modernPhotoUrl} target="_blank" rel="noreferrer">
                <Camera size={13} />開啟現況資料<ExternalLink size={12} />
              </a>
            ) : null}
          </div>
        )}

        {isModern ? (
          <>
            <section className="info-section current-site-section">
              <h3>今天來到這裡</h3>
              {location.modernAddress ? <p className="site-address">{location.modernAddress}</p> : null}
              <p className="info-lead">{location.modernStatus ?? "歷史地點現址"}</p>
              <p>{location.todayIntro ?? "此處是理解滬尾之役與今日淡水地景關係的現代定位點。"}</p>
            </section>
            <section className="info-section">
              <h3>歷史意義</h3>
              <p className="info-lead">{location.historicalSignificance}</p>
            </section>
            <section className="info-section">
              <h3>1884 年的關係</h3>
              <p className="info-lead">{location.summary}</p>
              <p>{location.detail}</p>
            </section>
          </>
        ) : (
          <>
            <section className="info-section strategic-section">
              <h3>戰略意義</h3>
              <p className="info-lead">{location.strategicMeaning}</p>
            </section>
            <section className="info-section">
              <h3>歷史檔案</h3>
              <p className="info-lead">{location.summary}</p>
              <p>{location.detail}</p>
              <p>{location.historicalSignificance}</p>
            </section>
          </>
        )}

        {personContext && relatedPersonPlace ? (
          <section className="info-section person-map-context">
            <h3><UserRound size={16} />人物與此地</h3>
            <strong>{personContext.name}</strong>
            <p>{relatedPersonPlace.note}</p>
            <small>{personContext.battleRole}</small>
          </section>
        ) : null}

        <section className="info-section">
          <h3>關鍵資料</h3>
          <ul>{location.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
        </section>

        {location.relatedEventIds.length ? (
          <section className="info-section">
            <h3>相關戰事</h3>
            <div className="related-events">
              {location.relatedEventIds.map((eventId) => {
                const event = battleEvents.find((item) => item.id === eventId);
                if (!event) return null;
                return (
                  <button key={eventId} type="button" onClick={() => onSelectRelatedEvent(eventId)}>
                    <small>{event.date}</small>
                    <span>{event.shortTitle}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        <details className="source-note">
          <summary>
            <BookOpen size={16} />
            <span>史料注記</span>
            <em>{accuracyLabel(location)}</em>
          </summary>
          <div className="source-note-body">
            <div className="source-note-accuracy">
              <CircleAlert size={17} />
              <p>{location.accuracyNote}</p>
            </div>
            {location.accuracy !== "verified" ? (
              <p className="source-note-caution">地圖以線與範圍表達推定位置，不把消失地景誤作仍可精密定位的單一遺址。</p>
            ) : null}
            <div className="source-section">
              {location.sources.map((source) => (
                <a key={`${source.url}-${source.label}`} href={source.url} target="_blank" rel="noreferrer">
                  <BookOpen size={15} />{source.label}
                </a>
              ))}
            </div>
          </div>
        </details>
      </div>
    </aside>
  );
}
