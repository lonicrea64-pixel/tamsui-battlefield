"use client";

import dynamic from "next/dynamic";

import { FactionFilter, LayerKey, MapMode } from "@/types/historical";

const LeafletMapCanvas = dynamic(() => import("@/components/map/LeafletMapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="map-loading">
      <div className="loading-mark">滬</div>
      <p>展開淡水地圖</p>
    </div>
  )
});

interface MapContainerProps {
  mode: MapMode;
  faction: FactionFilter;
  activePhase: number;
  layers: Record<LayerKey, boolean>;
  selectedLocationId: string | null;
  onSelectLocation: (locationId: string) => void;
}

export default function HistoricalMapContainer(props: MapContainerProps) {
  return (
    <section className="map-canvas-shell" aria-label="淡水古戰場互動地圖">
      <LeafletMapCanvas {...props} />
    </section>
  );
}
