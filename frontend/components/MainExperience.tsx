"use client";

import {
  Anchor,
  Archive,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crosshair,
  ExternalLink,
  FileText,
  Layers3,
  Map as MapIcon,
  Menu,
  Pause,
  Play,
  Shield,
  X
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import HistoricalMapContainer from "@/components/map/MapContainer";
import InfoPanel from "@/components/panels/InfoPanel";
import {
  battleEvents,
  defaultLayers,
  exhibitionSources,
  locations
} from "@/data/battleData";
import { archiveStories, people, warSections, warSources } from "@/data/contentData";
import { FactionFilter, HistoricalPerson, LayerKey, MapMode } from "@/types/historical";

type ArchiveTab = "timeline" | "stories" | "sites" | "sources";
type ExperienceView = "map" | "war" | "people";

const factionOptions: Array<{ value: FactionFilter; label: string }> = [
  { value: "all", label: "全部" },
  { value: "qing", label: "清軍" },
  { value: "french", label: "法軍" },
  { value: "civilian", label: "居民" }
];

const layerOptions: Array<{ key: LayerKey; label: string }> = [
  { key: "terrain", label: "地形與地點" },
  { key: "barriers", label: "城岸與阻隔" },
  { key: "battleZones", label: "交戰區" },
  { key: "facilities", label: "守軍設施（砲、水雷營等）" },
  { key: "troops", label: "士兵" },
  { key: "fleet", label: "法軍艦隊" },
  { key: "heritage", label: "史蹟" }
];

const archiveTabs: Array<{ id: ArchiveTab; label: string; icon: typeof Clock3 }> = [
  { id: "timeline", label: "時間", icon: Clock3 },
  { id: "stories", label: "史話", icon: FileText },
  { id: "sites", label: "地點", icon: MapIcon },
  { id: "sources", label: "史料", icon: BookOpen }
];

const primaryViews: Array<{ id: ExperienceView; label: string }> = [
  { id: "map", label: "戰場地圖" },
  { id: "war", label: "清法戰爭" },
  { id: "people", label: "人物誌" }
];

function WarOverview({ onOpenMap }: { onOpenMap: () => void }) {
  return (
    <main className="content-view war-view">
      <header className="editorial-header">
        <p>1883–1885 · 中法戰爭</p>
        <h2>從越南危機到淡水河口</h2>
        <div className="editorial-deck">
          <strong>滬尾之役是清法戰爭臺灣戰場的重要一役，理解其意義仍須回到越南、福建、基隆與澎湖等戰線。</strong>
          <span>本頁依序說明戰爭起因、主要戰局、和約內容，以及戰事對臺灣防務與地方社會的影響。</span>
        </div>
        <button type="button" className="text-command" onClick={onOpenMap}>
          <Crosshair size={18} />進入滬尾戰場
        </button>
      </header>

      <section className="taiwan-theater-band" aria-label="滬尾的戰略位置">
        <div className="theater-heading">
          <p>1884 · 福爾摩沙戰區</p>
          <h3>滬尾，北臺灣的海上門戶</h3>
          <span>淡水河通往臺北盆地。法軍若突破河口阻絕與陸上防線，便可進一步威脅北臺灣的行政與補給中心。滬尾的戰略位置來自這條河運通道，而不只是港口本身。</span>
        </div>
      </section>

      <section className="war-image-strip" aria-label="清法戰爭現存見證" onWheel={(event) => { if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) { event.currentTarget.scrollLeft += event.deltaY; event.preventDefault(); } }}>
        <figure><img src="/images/sites/hobe-fort.jpg" alt="滬尾礮臺現況" /><figcaption><strong>戰後海防</strong><span>滬尾礮臺不是 1884 舊砲臺，而是戰後改革的實體見證。</span></figcaption></figure>
        <figure><img src="/images/sites/mackay-clinic.jpg" alt="滬尾偕醫館現況" /><figcaption><strong>港市與救護</strong><span>偕醫館把戰事連回傷患、外僑與居民生活。</span></figcaption></figure>
        <figure><img src="/images/sites/wanshan.jpg" alt="淡水大庄萬善堂現況" /><figcaption><strong>傷亡與記憶</strong><span>遷葬墓碑讓無名清勇與地方祭祀重新可見。</span></figcaption></figure>
        <figure><img src="/images/sites/shalun.jpg" alt="沙崙海岸現況" /><figcaption><strong>登陸海岸</strong><span>今日海岸經過填築，仍可由沙崙方向理解法軍登陸與撤退的空間關係。</span></figcaption></figure>
        <figure><img src="/images/sites/fort-santo-domingo.jpg" alt="紅毛城與淡水河口" /><figcaption><strong>河口與港市</strong><span>淡水河連接港口與臺北盆地，這條水路使滬尾成為北臺灣防務要地。</span></figcaption></figure>
        <figure><img src="/images/sites/tamsui-lighthouse.jpg" alt="淡水港燈塔現況" /><figcaption><strong>航道與封鎖</strong><span>河口航道、沉船與水雷共同構成阻絕；戰後港口仍持續變動。</span></figcaption></figure>
      </section>

      <div className="article-layout">
        <aside className="article-index" aria-label="文章目錄">
          <strong>本頁目錄</strong>
          {warSections.map((section, index) => (
            <a key={section.id} href={`#war-${section.id}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>{section.title}
            </a>
          ))}
        </aside>

        <article className="longform-article">
          {warSections.map((section) => (
            <section key={section.id} id={`war-${section.id}`} className="war-section">
              <p className="section-eyebrow">{section.eyebrow}</p>
              <h3>{section.title}</h3>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.facts ? (
                <dl className="fact-ledger">
                  {section.facts.map((fact) => (
                    <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>
                  ))}
                </dl>
              ) : null}
            </section>
          ))}

          <section className="war-section source-register">
            <p className="section-eyebrow">參考資料</p>
            <h3>內容校核</h3>
            {warSources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                <BookOpen size={16} />{source.label}<ExternalLink size={13} />
              </a>
            ))}
          </section>
        </article>
      </div>
    </main>
  );
}

function PersonArticle({
  person,
  onLocate
}: {
  person: HistoricalPerson;
  onLocate: (person: HistoricalPerson, locationId: string, phase: number) => void;
}) {
  return (
    <article className={["person-article", person.faction].join(" ")}>
      <header className="person-title">
        <p>{person.campLabel}</p>
        <h2>{person.name}</h2>
        {person.originalName ? <span>{person.originalName}</span> : null}
      </header>

      <aside className="person-infobox">
        {person.portrait ? (
          <figure className="person-portrait">
            <img src={person.portrait.src} alt={person.portrait.alt} />
            <figcaption>
              <span>{person.portrait.caption}</span>
              <a href={person.portrait.sourceUrl} target="_blank" rel="noreferrer">{person.portrait.credit}</a>
            </figcaption>
          </figure>
        ) : (
          <div className={["portrait-placeholder", person.faction].join(" ")} aria-hidden="true">
            <span>{person.name.slice(0, 1)}</span>
          </div>
        )}
        <dl>
          <div><dt>生卒</dt><dd>{person.lifeSpan ?? "史料未詳"}</dd></div>
          <div><dt>陣營</dt><dd>{person.campLabel}</dd></div>
          <div><dt>身分</dt><dd>{person.role}</dd></div>
          <div><dt>關聯地點</dt><dd>{person.relatedLocationIds.length} 處</dd></div>
        </dl>
        <div className="person-locator">
          <button type="button" className="text-command compact" aria-haspopup="menu">
            <MapIcon size={16} />在地圖定位
          </button>
          <div className="person-location-menu" role="menu">
            {person.relatedPlaces.map((place) => {
              const location = locations.find((item) => item.id === place.locationId);
              if (!location) return null;
              return (
                <button key={place.locationId} type="button" role="menuitem" onClick={() => onLocate(person, place.locationId, place.phase)}>
                  <span>{String(location.brochureIndex).padStart(2, "0")}</span>
                  <strong>{location.title}</strong>
                  <small>{place.note}</small>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <p className="person-lead">{person.lead}</p>
      <section>
        <h3>生平</h3>
        {person.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <section>
        <h3>滬尾之役中的角色</h3>
        <p>{person.battleRole}</p>
      </section>
      <section>
        <h3>歷史評價與記憶</h3>
        <p>{person.legacy}</p>
      </section>
      <section className="person-sources">
        <h3>參考資料</h3>
        {person.sources.map((source) => (
          <a key={`${source.url}-${source.label}`} href={source.url} target="_blank" rel="noreferrer">
            <BookOpen size={15} />{source.label}<ExternalLink size={12} />
          </a>
        ))}
      </section>
    </article>
  );
}

function PeopleEncyclopedia({ onLocate }: { onLocate: (person: HistoricalPerson, locationId: string, phase: number) => void }) {
  const [selectedId, setSelectedId] = useState(people[0].id);
  const selected = people.find((person) => person.id === selectedId) ?? people[0];

  return (
    <main className="content-view people-view">
      <aside className="people-index">
        <header><p>人物百科</p><h2>戰爭中的人</h2></header>
        <nav aria-label="人物索引">
          {people.map((person) => (
            <button
              key={person.id}
              type="button"
              className={person.id === selected.id ? "active" : ""}
              onClick={() => setSelectedId(person.id)}
            >
              <span className={`camp-dot ${person.faction}`} />
              <span><strong>{person.name}</strong><small>{person.role}</small></span>
            </button>
          ))}
        </nav>
      </aside>
      <div className="people-document"><PersonArticle person={selected} onLocate={onLocate} /></div>
    </main>
  );
}

export default function MainExperience() {
  const [view, setView] = useState<ExperienceView>("map");
  const [mode, setMode] = useState<MapMode>("historical");
  const [faction, setFaction] = useState<FactionFilter>("all");
  const [activePhase, setActivePhase] = useState(5);
  const [layers, setLayers] = useState(defaultLayers);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [archiveTab, setArchiveTab] = useState<ArchiveTab>("timeline");
  const [archiveOpen, setArchiveOpen] = useState(true);
  const [layersOpen, setLayersOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);

  const selectedLocation = useMemo(
    () => locations.find((location) => location.id === selectedLocationId) ?? null,
    [selectedLocationId]
  );
  const currentEvent = battleEvents[activePhase] ?? battleEvents[0];
  const selectedPerson = useMemo(
    () => people.find((person) => person.id === selectedPersonId) ?? null,
    [selectedPersonId]
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 720px)");
    const closeArchiveOnMobile = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) setArchiveOpen(false);
    };
    closeArchiveOnMobile(mobileQuery);
    mobileQuery.addEventListener("change", closeArchiveOnMobile);
    return () => mobileQuery.removeEventListener("change", closeArchiveOnMobile);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setActivePhase((phase) => {
        if (phase >= battleEvents.length - 1) {
          setIsPlaying(false);
          return phase;
        }
        return phase + 1;
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const selectEvent = (phase: number) => {
    setActivePhase(phase);
    setIsPlaying(false);
    setSelectedLocationId(null);
    setSelectedPersonId(null);
  };

  const locatePerson = (person: HistoricalPerson, locationId: string, phase: number) => {
    setView("map");
    setMode("historical");
    setFaction(person.faction);
    setArchiveOpen(false);
    setActivePhase(phase);
    setSelectedPersonId(person.id);
    setSelectedLocationId(locationId);
  };

  const toggleLayer = (key: LayerKey) => setLayers((current) => ({ ...current, [key]: !current[key] }));
  const switchMapMode = (nextMode: MapMode) => {
    setMode(nextMode);
    setSelectedLocationId(null);
    setSelectedPersonId(null);
    if (nextMode === "modern") setFaction("all");
  };

  const openHistoricalBattlefield = () => {
    setView("map");
    setMode("historical");
    setFaction("all");
    setActivePhase(5);
    setSelectedLocationId(null);
    setSelectedPersonId(null);
    setArchiveOpen(false);
    setLayersOpen(false);
    setIsPlaying(false);
  };

  return (
    <div className="exhibition-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-seal" aria-hidden="true">滬</div>
          <div><p className="brand-kicker">1884 · 清法戰爭</p><h1>淡水古戰場</h1></div>
        </div>

        <nav className="primary-nav" aria-label="展覽頁面">
          {primaryViews.map((item) => (
            <button key={item.id} type="button" className={view === item.id ? "active" : ""} onClick={() => setView(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          {view === "map" ? (
            <>
              <button
                type="button"
                className={`icon-command ${archiveOpen ? "active" : ""}`}
                onClick={() => setArchiveOpen((open) => !open)}
                aria-label={archiveOpen ? "關閉資料櫃" : "開啟資料櫃"}
                title="資料櫃"
              >
                {archiveOpen ? <X size={19} /> : <Menu size={19} />}
              </button>
              <button
                type="button"
                className={`icon-command ${layersOpen ? "active" : ""}`}
                onClick={() => setLayersOpen((open) => !open)}
                aria-label="開啟地圖圖層"
                title="地圖圖層"
              >
                <Layers3 size={19} />
              </button>
            </>
          ) : null}
        </div>
      </header>

      {view === "war" ? <WarOverview onOpenMap={openHistoricalBattlefield} /> : null}
      {view === "people" ? <PeopleEncyclopedia onLocate={locatePerson} /> : null}

      {view === "map" ? (
        <main className="map-workspace">
          <HistoricalMapContainer
            mode={mode}
            faction={faction}
            activePhase={activePhase}
            layers={layers}
            selectedLocationId={selectedLocationId}
            onSelectLocation={setSelectedLocationId}
          />

          <div className="mode-switch map-mode-switch" aria-label="地圖模式">
            <button type="button" className={mode === "historical" ? "active" : ""} onClick={() => switchMapMode("historical")}>
              <Archive size={16} />1884 古戰場
            </button>
            <button type="button" className={mode === "modern" ? "active" : ""} onClick={() => switchMapMode("modern")}>
              <MapIcon size={16} />現代淡水
            </button>
          </div>

          {mode === "historical" ? (
            <section className="map-status" aria-live="polite">
              <div className="status-mark">{currentEvent.faction === "french" ? <Anchor size={18} /> : <Shield size={18} />}</div>
              <div><p>{currentEvent.date}{currentEvent.time ? ` · ${currentEvent.time}` : ""}</p><strong>{currentEvent.title}</strong></div>
            </section>
          ) : null}

          {mode === "historical" ? (
            <div className="faction-filter" aria-label="陣營篩選">
              {factionOptions.map((option) => (
                <button key={option.value} type="button" className={faction === option.value ? "active" : ""} onClick={() => setFaction(option.value)}>
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}

          {layersOpen ? (
            <aside className="layer-popover" aria-label="地圖圖層">
              <div className="popover-heading">
                <div><span>地圖圖層</span><small>顯示中的資料</small></div>
                <button type="button" onClick={() => setLayersOpen(false)} aria-label="關閉圖層選單"><X size={17} /></button>
              </div>
              {layerOptions.map((option) => (
                <label key={option.key} className="layer-row">
                  <input type="checkbox" checked={layers[option.key]} onChange={() => toggleLayer(option.key)} />
                  <span>{option.label}</span>
                </label>
              ))}
              <p className="layer-note">虛線與淡色範圍用來區分史料可指認的區域與仍待考證的線位。</p>
            </aside>
          ) : null}

          <aside className={`archive-panel ${archiveOpen ? "open" : ""}`} aria-label="展覽資料櫃">
            <nav className="archive-tabs" aria-label="資料分類">
              {archiveTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id} type="button" className={archiveTab === tab.id ? "active" : ""} onClick={() => setArchiveTab(tab.id)}>
                    <Icon size={17} />{tab.label}
                  </button>
                );
              })}
            </nav>

            <div className="archive-content">
              {archiveTab === "timeline" ? (
                <div className="timeline-list">
                  <header><p>作戰過程 1–13</p><h2>從警告、登陸到和約</h2></header>
                  {battleEvents.map((event) => (
                    <button key={event.id} type="button" className={`timeline-entry ${activePhase === event.phase ? "active" : ""}`} onClick={() => selectEvent(event.phase)}>
                      <span className="timeline-index">{String(event.phase + 1).padStart(2, "0")}</span>
                      <span><small>{event.date}{event.time ? ` · ${event.time}` : ""}</small><strong>{event.shortTitle}</strong><em>{event.summary}</em></span>
                    </button>
                  ))}
                </div>
              ) : null}

              {archiveTab === "stories" ? (
                <div className="story-archive">
                  <header><p>戰事史話</p><h2>滬尾血戰八章</h2></header>
                  {archiveStories.map((story, index) => (
                    <details key={story.id} open={index === 0}>
                      <summary><small>{story.chapter}</small><strong>{story.title}</strong><span>{story.lead}</span></summary>
                      <div className="story-body">
                        {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        <ul>{story.keyFacts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                        <small>{story.sourceNote}</small>
                      </div>
                    </details>
                  ))}
                </div>
              ) : null}

              {archiveTab === "sites" ? (
                <div className="archive-list">
                  <header><p>淡水古戰場 13 處</p><h2>戰略位置與今日遺址</h2></header>
                  {locations.map((location) => (
                    <button key={location.id} type="button" className={selectedLocationId === location.id ? "active" : ""} onClick={() => setSelectedLocationId(location.id)}>
                      <span className="archive-site-index">{String(location.brochureIndex).padStart(2, "0")}</span>
                      <span>
                        <strong>{mode === "modern" ? location.modernName ?? location.title : location.title}</strong>
                        <small>{location.ancientName} → {location.modernName}</small>
                        <em>{location.accuracy === "verified" ? "現址可確認" : location.accuracy === "documented-area" ? "文獻確認範圍" : "研究推定位置"}</em>
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}

              {archiveTab === "sources" ? (
                <div className="source-list" id="source-note">
                  <header><p>史料注記</p><h2>戰場圖件與研究文獻</h2></header>
                  <p className="source-intro">2004 年《淡水古戰場》收錄十三處地點與地方史話；1881 年《Tamsui Harbour》、法軍戰場圖、GIS 研究及古蹟博物館資料則補足舊海岸、地名與戰場範圍。</p>
                  <div className="accuracy-key"><span><i className="verified" />現址可確認</span><span><i className="area" />文獻確認範圍</span><span><i className="approximate" />研究推定</span></div>
                  {exhibitionSources.map((source) => source.url.startsWith("http") ? (
                    <a key={source.label} href={source.url} target="_blank" rel="noreferrer"><BookOpen size={16} /><span>{source.label}</span></a>
                  ) : (
                    <div key={source.label} className="source-local"><Archive size={16} /><span>{source.label}<small>2004 年地方文史資料</small></span></div>
                  ))}
                  <div className="source-warning"><strong>傷亡數字存在差異</strong><p>官方研究常見法軍陣亡及失蹤 17 人、傷 49 人；其他清、法記載另有不同數字。傷亡統計須連同記錄者、時間與統計口徑理解。</p></div>
                </div>
              ) : null}
            </div>
          </aside>

          <InfoPanel
            location={selectedLocation}
            personContext={selectedPerson}
            mode={mode}
            onClose={() => setSelectedLocationId(null)}
            onSelectRelatedEvent={(eventId) => {
              const event = battleEvents.find((item) => item.id === eventId);
              if (event) {
                switchMapMode("historical");
                setActivePhase(event.phase);
                setIsPlaying(false);
              }
            }}
          />

          {mode === "historical" ? (
            <section className="timeline-dock" aria-label="戰事時間軸">
              <button type="button" className="play-button" onClick={() => { if (activePhase >= battleEvents.length - 1) setActivePhase(0); setIsPlaying((playing) => !playing); }} aria-label={isPlaying ? "暫停戰事演示" : "播放戰事演示"} title={isPlaying ? "暫停" : "播放"}>
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
              </button>
              <button type="button" className="step-button" disabled={activePhase === 0} onClick={() => selectEvent(Math.max(0, activePhase - 1))} aria-label="上一個事件"><ChevronLeft size={18} /></button>
              <div className="timeline-track">
                {battleEvents.map((event) => (
                  <button key={event.id} type="button" className={event.phase <= activePhase ? "reached" : ""} onClick={() => selectEvent(event.phase)} aria-label={`${event.date} ${event.shortTitle}`} title={`${event.date}｜${event.shortTitle}`}><span /></button>
                ))}
              </div>
              <div className="dock-label"><small>{currentEvent.date}{currentEvent.date === "10 月 8 日" && currentEvent.time ? ` · ${currentEvent.time}` : ""}</small><strong>{currentEvent.shortTitle}</strong></div>
              <button type="button" className="step-button" disabled={activePhase === battleEvents.length - 1} onClick={() => selectEvent(Math.min(battleEvents.length - 1, activePhase + 1))} aria-label="下一個事件"><ChevronRight size={18} /></button>
            </section>
          ) : null}
        </main>
      ) : null}
    </div>
  );
}
