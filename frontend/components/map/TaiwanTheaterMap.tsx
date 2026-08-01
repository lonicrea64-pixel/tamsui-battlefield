"use client";

import dynamic from "next/dynamic";

const TaiwanMapCanvas = dynamic(() => import("@/components/map/TaiwanMapCanvas"), {
  ssr: false,
  loading: () => <div className="taiwan-map-loading">展開 1884 臺灣戰區</div>
});

export default function TaiwanTheaterMap() {
  return <TaiwanMapCanvas />;
}
