import { SiteSummary } from "../types";

interface InteractiveMapProps {
  sites: SiteSummary[];
  selectedSiteId?: string;
  onSelectSite: (siteId: string) => void;
}

export function InteractiveMap({ sites, selectedSiteId, onSelectSite }: InteractiveMapProps) {
  return (
    <section className="map-panel" aria-label="淡水古戰場互動地圖">
      <div className="map-header">
        <h2>淡水古戰場互動地圖</h2>
        <p>點擊地圖標記，查看該戰場點位在清法戰爭中的角色。</p>
      </div>

      <div className="map-canvas" role="group" aria-label="戰場地圖標記">
        <div className="coastline" aria-hidden="true" />
        {sites.map((site) => {
          const isActive = site.id === selectedSiteId;
          return (
            <button
              key={site.id}
              className={`map-marker ${isActive ? "active" : ""}`}
              style={{ left: `${site.mapPosition.xPercent}%`, top: `${site.mapPosition.yPercent}%` }}
              onClick={() => onSelectSite(site.id)}
              aria-pressed={isActive}
              aria-label={`查看 ${site.name}`}
              type="button"
            >
              <span className="marker-dot" />
              <span className="marker-label">{site.name}</span>
            </button>
          );
        })}
      </div>

      <ul className="site-list" aria-label="古戰場列表">
        {sites.map((site) => (
          <li key={site.id}>
            <button
              type="button"
              className={site.id === selectedSiteId ? "selected" : ""}
              onClick={() => onSelectSite(site.id)}
            >
              <strong>{site.name}</strong>
              <span>{site.shortDescription}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
