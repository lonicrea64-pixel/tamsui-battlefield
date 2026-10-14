"use client";

import { divIcon } from "leaflet";
import { useMemo } from "react";
import { Marker, Tooltip } from "react-leaflet";

import { locationMarkerGlyphs } from "@/data/battleData";
import { HistoricalLocation, MapMode } from "@/types/historical";

interface MapMarkerProps {
  location: HistoricalLocation;
  mode: MapMode;
  coordinateOverride?: [number, number];
  active: boolean;
  onSelect: (locationId: string) => void;
}

export default function MapMarker({ location, mode, coordinateOverride, active, onSelect }: MapMarkerProps) {
  const coordinates = coordinateOverride ?? (mode === "modern"
    ? location.modernCoordinates ?? location.coordinates
    : location.coordinates);
  const icon = useMemo(() => {
    const accuracyClass = location.accuracy === "verified" ? "verified" : "uncertain";
    return divIcon({
      className: "battle-marker-host",
      html: `<span class="battle-marker ${mode} ${location.category} ${location.period} ${accuracyClass} ${active ? "active" : ""}">${locationMarkerGlyphs[location.id] ?? location.brochureIndex}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });
  }, [active, location.accuracy, location.category, location.period, location.brochureIndex, location.id, mode]);

  return (
    <Marker
      position={coordinates}
      icon={icon}
      eventHandlers={{ click: () => onSelect(location.id) }}
      keyboard
      title={location.title}
    >
      <Tooltip
        permanent={active}
        direction="right"
        offset={[15, 0]}
        className={`battle-label ${active ? "active" : ""}`}
      >
        <strong>{mode === "modern" ? location.modernName ?? location.title : location.title}</strong>
        <span>{mode === "modern" ? location.modernStatus : location.ancientName}</span>
      </Tooltip>
    </Marker>
  );
}
