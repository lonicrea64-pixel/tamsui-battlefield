"use client";

import * as L from "leaflet";
import { divIcon, latLngBounds } from "leaflet";
import "@maplibre/maplibre-gl-leaflet";
import { useEffect, useMemo } from "react";
import {
  Circle,
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  ScaleControl,
  TileLayer,
  Tooltip,
  useMap,
  ZoomControl
} from "react-leaflet";

import MapMarker from "@/components/map/MapMarker";
import {
  battleRoutes,
  battleZones,
  defenseLines,
  fleetBombardmentPositions,
  fleetLandingPositions,
  fleetPositions,
  historicalSiteGeometries,
  locationMarkerGlyphs,
  locations,
  tacticalSymbols
} from "@/data/battleData";
import {
  BattleRoute,
  Faction,
  FactionFilter,
  HistoricalSiteGeometry,
  LayerKey,
  MapMode,
  TacticalSymbol
} from "@/types/historical";

interface LeafletMapCanvasProps {
  mode: MapMode;
  faction: FactionFilter;
  activePhase: number;
  layers: Record<LayerKey, boolean>;
  selectedLocationId: string | null;
  onSelectLocation: (locationId: string) => void;
}


function MapFocus({ selectedLocationId, mode }: { selectedLocationId: string | null; mode: MapMode }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedLocationId) return;
    const location = locations.find((item) => item.id === selectedLocationId);
    if (!location) return;
    const historicalGeometry = historicalSiteGeometries.find((item) => item.locationId === selectedLocationId);
    const coordinates = mode === "modern"
      ? location.modernCoordinatePoints?.[0] ?? location.modernCoordinates ?? location.coordinates
      : historicalGeometry?.labelPosition ?? location.coordinates;
    map.flyTo(coordinates, Math.max(map.getZoom(), 14), { duration: 0.7 });
  }, [map, mode, selectedLocationId]);

  return null;
}

function MapOverviewConstraints({ mode }: { mode: MapMode }) {
  const map = useMap();

  useEffect(() => {
    const overview = mode === "historical"
      ? latLngBounds([25.157, 121.388], [25.205, 121.451])
      : latLngBounds([25.151, 121.398], [25.207, 121.462]);
    const updateMinimumZoom = () => {
      const minimumZoom = Math.max(12, map.getBoundsZoom(overview, false));
      map.setMinZoom(minimumZoom);
      if (map.getZoom() < minimumZoom) map.setZoom(minimumZoom);
    };

    updateMinimumZoom();
    map.on("resize", updateMinimumZoom);
    return () => {
      map.off("resize", updateMinimumZoom);
    };
  }, [map, mode]);

  return null;
}

function rampartPath(positions: Array<[number, number]>, style: "alternating" | "crenellated" = "alternating") {
  const validPositions = positions.filter(([latitude, longitude]) =>
    Number.isFinite(latitude) && Number.isFinite(longitude)
  );
  if (validPositions.length < 2) return validPositions;

  const segmentLengths = validPositions.slice(1).map((position, index) =>
    Math.hypot(position[0] - validPositions[index][0], position[1] - validPositions[index][1])
  );
  const totalLength = segmentLengths.reduce((sum, length) => sum + length, 0);
  if (totalLength === 0) return validPositions;

  const toothCount = Math.max(4, Math.round(totalLength / 0.00125));
  const pointAt = (distance: number): [number, number] => {
    let travelled = 0;

    for (let index = 0; index < segmentLengths.length; index += 1) {
      const length = segmentLengths[index];
      if (distance <= travelled + length || index === segmentLengths.length - 1) {
        const start = validPositions[index];
        const end = validPositions[index + 1];
        const fraction = length === 0 ? 0 : Math.min(1, Math.max(0, (distance - travelled) / length));
        return [
          start[0] + (end[0] - start[0]) * fraction,
          start[1] + (end[1] - start[1]) * fraction
        ];
      }
      travelled += length;
    }

    return validPositions[validPositions.length - 1];
  };

  const result: Array<[number, number]> = [pointAt(0)];

  for (let tooth = 0; tooth < toothCount; tooth += 1) {
    const start = pointAt((totalLength * tooth) / toothCount);
    const end = pointAt((totalLength * (tooth + 1)) / toothCount);
    const latitudeDelta = end[0] - start[0];
    const longitudeDelta = end[1] - start[1];
    const length = Math.hypot(latitudeDelta, longitudeDelta);
    if (length === 0) continue;

    if (style === "crenellated") {
      const shoulderStart = pointAt((totalLength * (tooth + 0.22)) / toothCount);
      const shoulderEnd = pointAt((totalLength * (tooth + 0.78)) / toothCount);
      const amplitude = Math.min(0.00032, length * 0.46);
      const normalLatitude = (-longitudeDelta / length) * amplitude;
      const normalLongitude = (latitudeDelta / length) * amplitude;

      result.push(
        shoulderStart,
        [shoulderStart[0] + normalLatitude, shoulderStart[1] + normalLongitude],
        [shoulderEnd[0] + normalLatitude, shoulderEnd[1] + normalLongitude],
        shoulderEnd,
        end
      );
      continue;
    }

    const side = tooth % 2 === 0 ? 1 : -1;
    const amplitude = Math.min(0.00022, length * 0.34);
    const normalLatitude = (-longitudeDelta / length) * amplitude * side;
    const normalLongitude = (latitudeDelta / length) * amplitude * side;

    result.push(
      [start[0] + normalLatitude, start[1] + normalLongitude],
      [end[0] + normalLatitude, end[1] + normalLongitude],
      end
    );
  }

  return result;
}

function siteGeometryIcon(geometry: HistoricalSiteGeometry, glyph: string, active: boolean, faction: Faction) {
  return divIcon({
    className: "site-geometry-host",
    html: `<span class="site-geometry-badge ${geometry.kind} ${geometry.locationId} ${faction} ${active ? "active" : ""}">${glyph}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
}

function historicalTextIcon(text: string, active: boolean) {
  return divIcon({
    className: "historical-text-label-host",
    html: `<span class="historical-text-label ${active ? "active" : ""}">${text}</span>`,
    iconSize: [36, 176],
    iconAnchor: [18, 88]
  });
}

function historicalTerrainTextIcon(text: string, layout: "diagonal" | "horizontal") {
  const characters = Array.from(text).map((character) => "<span>" + character + "</span>").join("");
  return divIcon({
    className: "historical-terrain-text-label-host",
    html: '<span class="historical-terrain-text-label ' + layout + '">' + characters + "</span>",
    iconSize: [210, 120],
    iconAnchor: [105, 60]
  });
}

const historicalTerrainTextLabels: Array<{ id: string; text: string; position: [number, number]; layout: "diagonal" | "horizontal" }> = [
  { id: "jinmugang-wetland-text", text: "金目港仔濕地", position: [25.181000, 121.420600], layout: "diagonal" },
  { id: "wuciupu-highland-text", text: "烏啾埔高地", position: [25.182000, 121.431600], layout: "horizontal" }
];

function SiteGeometryLayer({
  geometry,
  active,
  onSelect
}: {
  geometry: HistoricalSiteGeometry;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const location = locations.find((item) => item.id === geometry.locationId);
  if (!location) return null;

  if (geometry.locationId === "thorn-forest") {
    return (
      <Marker
        position={geometry.labelPosition}
        icon={historicalTextIcon("金針木耳林", active)}
        eventHandlers={{ click: () => onSelect(location.id) }}
        keyboard
        title={location.title}
      >
        <Tooltip permanent={active} direction="right" offset={[18, 0]} className={`battle-label ${active ? "active" : ""}`}>
          <strong>{location.title}</strong>
          <span>{geometry.note}</span>
        </Tooltip>
      </Marker>
    );
  }

  if (geometry.kind === "point") {
    return <MapMarker location={location} mode="historical" active={active} onSelect={onSelect} />;
  }

  const siteColors: Record<Faction, string> = {
    qing: "#8d2f2c",
    french: "#295f7e",
    civilian: "#78713b",
    neutral: "#5d5951"
  };
  const siteColor = geometry.locationId === "thorn-forest" ? "#5d5951" : siteColors[location.faction];
  const pathOptions = geometry.kind === "line"
    ? { color: siteColor, weight: active ? 6 : 4, opacity: 0.92, dashArray: geometry.locationId === "city-bank-remains" ? undefined : "9 6" }
    : {
        color: siteColor,
        fillColor: siteColor,
        fillOpacity: active ? 0.2 : 0.08,
        weight: active ? 3 : 2,
        opacity: 0.9,
        dashArray: "7 6"
      };
  const plottedPositions = geometry.locationId === "city-bank-remains" ? rampartPath(geometry.positions, "crenellated") : geometry.positions;
  const eventHandlers = { click: () => onSelect(location.id) };

  return (
    <>
      {geometry.kind === "line" ? (
        <Polyline positions={plottedPositions} pathOptions={{ ...pathOptions, lineJoin: "round", lineCap: "round" }} eventHandlers={eventHandlers}>
          <Tooltip sticky><strong>{location.title}</strong><span>{geometry.note}</span></Tooltip>
        </Polyline>
      ) : (
        <Polygon positions={geometry.positions} pathOptions={pathOptions} eventHandlers={eventHandlers}>
          <Tooltip sticky><strong>{location.title}</strong><span>{geometry.note}</span></Tooltip>
        </Polygon>
      )}
      <Marker
        position={geometry.labelPosition}
        icon={siteGeometryIcon(geometry, locationMarkerGlyphs[location.id] ?? String(location.brochureIndex), active, location.faction)}
        eventHandlers={eventHandlers}
        keyboard
        title={location.title}
      >
        <Tooltip permanent={active} direction="right" offset={[15, 0]} className={`battle-label ${active ? "active" : ""}`}>
          <strong>{location.title}</strong>
          <span>{geometry.kind === "line" ? "線狀防禦遺構" : "史料指向範圍"}</span>
        </Tooltip>
      </Marker>
    </>
  );
}

const historicalCleanupMasks: Array<{ id: string; color: string; positions: Array<[number, number]> }> = [
  { id: "water-southwest-fill", color: "#849a9d", positions: [[25.160410, 121.342071], [25.172852, 121.373048], [25.172944, 121.374474], [25.141302, 121.374133], [25.138970, 121.361210], [25.156746, 121.353402], [25.155562, 121.345960]] },
  { id: "water-southbank-fill", color: "#849a9d", positions: [[25.158083, 121.393554], [25.156126, 121.398742], [25.153914, 121.403272], [25.148811, 121.400271], [25.143055, 121.394645], [25.139269, 121.388758], [25.143144, 121.376957], [25.144932, 121.380017], [25.147592, 121.384162], [25.151968, 121.387506], [25.156649, 121.391510]] },
  { id: "land-southbank-artifact", color: "#d9c89d", positions: [[25.159132, 121.404970], [25.160933, 121.406428], [25.162726, 121.408895], [25.162407, 121.409957], [25.161682, 121.409944], [25.160087, 121.408550], [25.158392, 121.406797]] },
  { id: "land-northbank-artifact", color: "#d9c89d", positions: [[25.173439, 121.435921], [25.173170, 121.437163], [25.172391, 121.437386], [25.172246, 121.436137], [25.172768, 121.435672]] },
  { id: "water-river-east-artifact", color: "#849a9d", positions: [[25.167777, 121.444485], [25.167868, 121.446089], [25.165881, 121.448427], [25.164076, 121.447504], [25.165228, 121.445863]] }
];

const historicalWaterwayRepairs: Array<Array<[number, number]>> = [
  [[25.191250, 121.425220], [25.190700, 121.425100]],
  [[25.190500, 121.429830], [25.189930, 121.430180]],
  [[25.186580, 121.433500], [25.186620, 121.434700]]
];

function defenseLineLabelIcon(glyph: string) {
  return divIcon({
    className: "site-geometry-host",
    html: `<span class="site-geometry-badge line qing bank-label">${glyph}</span>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
}

const routeColors = { qing: "#8d2f2c", french: "#295f7e" };

const historicalBasemapAttribution = [
  '<a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a>',
  '© <a href="https://openmaptiles.org/" target="_blank" rel="noreferrer">OpenMapTiles</a>',
  'Data from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
  '<a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noreferrer">Terrain Tiles</a>',
].join(" · ");

function HistoricalVectorBasemap() {
  const map = useMap();

  useEffect(() => {
    const layer = L.maplibreGL({
      style: "/maps/tamsui-physical-style.json",
      attributionControl: false,
      renderWorldCopies: false,
      fadeDuration: 0
    });

    layer.addTo(map);
    map.attributionControl.addAttribution(historicalBasemapAttribution);

    return () => {
      map.attributionControl.removeAttribution(historicalBasemapAttribution);
      if (map.hasLayer(layer)) map.removeLayer(layer);
    };
  }, [map]);

  return null;
}

function routeBearing(route: BattleRoute) {
  const end = route.positions[route.positions.length - 1];
  const previous = route.positions[route.positions.length - 2];
  return Math.atan2(-(end[0] - previous[0]), end[1] - previous[1]) * 180 / Math.PI;
}

function routeArrowIcon(route: BattleRoute) {
  const arrowColor = routeColors[route.faction];
  return divIcon({
    className: "route-arrow-host",
    html: `<svg class="route-arrow ${route.faction} ${route.kind}" style="--bearing:${routeBearing(route)}deg;color:${arrowColor}" viewBox="0 0 24 24" aria-hidden="true"><path d="M1 2L18 12L1 22Z" /></svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
}

const symbolGlyph: Record<TacticalSymbol["kind"], string> = {
  "french-base": "⚑",
  "french-position": "法",
  "qing-position": "營",
  "qing-guard": "清",
  battery: "砲",
  mine: "✹",
  "sunken-ship": "╳",
  landing: "⇥",
  signal: "⌁",
  battle: "交"
};

function symbolIcon(symbol: TacticalSymbol) {
  return divIcon({
    className: "tactical-symbol-host",
    html: `<span class="tactical-symbol ${symbol.kind} ${symbol.faction} ${symbol.accuracy === "verified" ? "" : "uncertain"}">${symbolGlyph[symbol.kind]}</span>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
}

export default function LeafletMapCanvas({
  mode,
  faction,
  activePhase,
  layers,
  selectedLocationId,
  onSelectLocation
}: LeafletMapCanvasProps) {
  const visibleLocations = useMemo(
    () => mode === "modern" ? locations.filter((location) => location.id === "old-bathing-beach" ? layers.terrain : layers.heritage) : [],
    [layers.heritage, layers.terrain, mode]
  );
  const visibleHistoricalSites = mode === "historical"
    ? historicalSiteGeometries.filter((geometry) =>
        activePhase >= (geometry.startPhase ?? 0) && activePhase <= (geometry.endPhase ?? 12)
      ).filter((geometry) => {
        if (geometry.locationId === "city-bank-remains") return layers.barriers;
        if (geometry.locationId === "tiansheng-battlefield") return layers.battleZones;
        if (geometry.locationId === "white-battery") return layers.facilities;
        if (geometry.locationId === "thorn-forest") return layers.terrain;
        if (geometry.locationId === "old-bathing-beach") return layers.terrain;
        return layers.heritage;
      })
    : [];

  const fleetIcon = useMemo(
    () => divIcon({
      className: "fleet-marker-host",
      html: '<span class="fleet-marker">艦</span>',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    []
  );

  const visibleRoutes = battleRoutes
    .filter((route) => activePhase >= route.startPhase && activePhase <= route.endPhase)
    .filter((route) => faction === "all" || faction === route.faction);

  const visibleSymbols = tacticalSymbols
    .filter((symbol) => activePhase >= symbol.startPhase && activePhase <= symbol.endPhase)
    .filter((symbol) => faction === "all" || symbol.faction === "mixed" || symbol.faction === faction);

  const visibleDefenseLines = defenseLines
    .filter((line) => activePhase >= line.startPhase && activePhase <= line.endPhase);

  const activeFleetPositions = activePhase === 4
    ? fleetBombardmentPositions
    : activePhase === 3 || (activePhase >= 5 && activePhase <= 9)
      ? fleetLandingPositions
      : fleetPositions.map((ship) => ship.coordinates);

  return (
    <div className={`leaflet-stage ${mode === "historical" ? "historical-mode" : "modern-mode"}`}>
      <MapContainer
        key={mode}
        center={mode === "historical" ? [25.1825, 121.4145] : [25.1820, 121.4220]}
        zoom={mode === "historical" ? 14 : 13.5}
        minZoom={12}
        maxZoom={18}
        zoomSnap={0.25}
        zoomDelta={0.5}
        maxBounds={mode === "historical" ? [[25.145, 121.360], [25.218, 121.478]] : [[25.140, 121.382], [25.215, 121.490]]}
        maxBoundsViscosity={0.82}
        zoomControl={false}
        scrollWheelZoom
        className="battle-map"
      >
        {mode === "modern" ? (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        ) : <HistoricalVectorBasemap />}

        {mode === "historical" ? historicalCleanupMasks.map((mask) => (
          <Polygon
            key={mask.id}
            positions={mask.positions}
            pathOptions={{ color: mask.color, weight: 0, fillColor: mask.color, fillOpacity: 1 }}
            interactive={false}
          />
        )) : null}

        {mode === "historical" ? historicalWaterwayRepairs.map((positions, index) => (
          <Polyline
            key={`waterway-repair-${index}`}
            positions={positions}
            pathOptions={{ color: "#5f8997", weight: 3, opacity: 0.95, lineCap: "round" }}
            interactive={false}
          />
        )) : null}

        {mode === "historical" && layers.barriers && (faction === "all" || faction === "qing")
          ? visibleDefenseLines.map((line) => (
              <Polyline
                key={line.id}
                positions={line.id === "inner-bank-line" ? rampartPath(line.positions, "crenellated") : line.positions}
                pathOptions={{
                  color: line.id === "river-obstruction" ? "#514332" : line.id === "wetland-fire-line" ? "#315f62" : "#8a302d",
                  weight: line.id === "river-obstruction" ? 4 : line.id === "wetland-fire-line" ? 3 : 5,
                  opacity: 0.92,
                  dashArray: line.id === "river-obstruction" ? "3 8" : line.id === "wetland-fire-line" ? "10 8" : undefined
                }}
                eventHandlers={{
                  click: () => onSelectLocation(
                    line.id === "river-obstruction"
                      ? "white-battery"
                      : line.id === "wetland-fire-line"
                        ? "tiansheng-battlefield"
                        : "city-bank-remains"
                  )
                }}
              >
                <Tooltip sticky><strong>{line.title}</strong><span>{line.note}</span></Tooltip>
              </Polyline>
            ))
          : null}

        {mode === "historical" && layers.barriers && (faction === "all" || faction === "qing")
          ? visibleDefenseLines.filter((line) => line.id === "inner-bank-line").map((line) => (
              <Marker key={`${line.id}-label`} position={line.positions[Math.floor(line.positions.length / 2)]} icon={defenseLineLabelIcon("內")} interactive={false} />
            ))
          : null}

        {mode === "historical" && layers.troops
          ? visibleRoutes.map((route) => (
              <Polyline
                key={route.id}
                positions={route.positions}
                pathOptions={{
                  color: routeColors[route.faction],
                  weight: route.id.startsWith("river-probe-") || route.kind === "retreat" ? 4 : 5,
                  opacity: route.id.startsWith("river-probe-") ? 0.78 : 0.92,
                  dashArray: route.kind === "retreat" ? "8 8" : undefined,
                  lineCap: "butt"
                }}
              >
                <Tooltip sticky><strong>{route.title}</strong><span>箭線依史料概化，不代表逐步測量軌跡</span></Tooltip>
              </Polyline>
            ))
          : null}

        {mode === "historical" && layers.troops
          ? visibleRoutes.map((route) => (
              <Marker
                key={`${route.id}-arrow`}
                position={route.positions[route.positions.length - 1]}
                icon={routeArrowIcon(route)}
                interactive={false}
              />
            ))
          : null}

        {mode === "historical" && layers.battleZones
          ? battleZones
              .filter((zone) => activePhase >= zone.startPhase && activePhase <= zone.endPhase)
              .filter((zone) => faction === "all" || zone.faction === "mixed" || zone.faction === faction)
              .map((zone) => (
                <Circle
                  key={zone.id}
                  center={zone.center}
                  radius={zone.radius}
                  pathOptions={{
                    color: zone.faction === "french" ? "#285d83" : "#7b302c",
                    fillColor: zone.faction === "french" ? "#668ca5" : "#a55b49",
                    fillOpacity: 0.12,
                    weight: 1.8,
                    dashArray: "6 7"
                  }}
                  eventHandlers={{ click: () => onSelectLocation(zone.id === "landing-zone" ? "shalun-landing" : "tiansheng-battlefield") }}
                >
                  <Tooltip sticky><strong>{zone.title}</strong><span>文獻確認之範圍示意</span></Tooltip>
                </Circle>
              ))
          : null}

        {mode === "historical" && layers.facilities
          ? visibleSymbols.filter((symbol) => ["battery", "mine", "sunken-ship", "qing-position"].includes(symbol.kind)).map((symbol) => (
              <Marker key={symbol.id} position={symbol.coordinates} icon={symbolIcon(symbol)} interactive>
                <Tooltip direction="top"><strong>{symbol.title}</strong><span>{symbol.note}</span></Tooltip>
              </Marker>
            ))
          : null}

        {mode === "historical" && layers.troops
          ? visibleSymbols.filter((symbol) => !["battery", "mine", "sunken-ship", "qing-position"].includes(symbol.kind)).map((symbol) => (
              <Marker key={symbol.id} position={symbol.coordinates} icon={symbolIcon(symbol)} interactive>
                <Tooltip direction="top"><strong>{symbol.title}</strong><span>{symbol.note}</span></Tooltip>
              </Marker>
            ))
          : null}

        {mode === "historical" && layers.fleet && activePhase <= 11 && (faction === "all" || faction === "french")
          ? (
            <>
              {activePhase === 11 ? (
                <Polyline
                  positions={activeFleetPositions}
                  pathOptions={{ color: "#295f7e", weight: 2, opacity: 0.68, dashArray: "6 8" }}
                  interactive={false}
                />
              ) : null}
              {fleetPositions.map((ship, index) => (
                <Marker key={ship.id} position={activeFleetPositions[index]} icon={fleetIcon} interactive>
                  <Tooltip direction="left"><strong>{ship.name}</strong><span>相對位置依歷史圖概化</span></Tooltip>
                </Marker>
              ))}
            </>
          )
          : null}

        {mode === "historical" && layers.terrain ? historicalTerrainTextLabels.map((label) => (
          <Marker
            key={label.id}
            position={label.position}
            icon={historicalTerrainTextIcon(label.text, label.layout)}
            interactive={false}
          />
        )) : null}

        {visibleHistoricalSites.map((geometry) => (
          <SiteGeometryLayer
            key={geometry.locationId}
            geometry={geometry}
            active={selectedLocationId === geometry.locationId}
            onSelect={onSelectLocation}
          />
        ))}

        {mode === "modern" ? visibleLocations
          .filter((location) => location.modernArea)
          .map((location) => (
            <Polygon
              key={`${location.id}-modern-area`}
              positions={location.modernArea!}
              pathOptions={{
                color: "#646964",
                fillOpacity: 0,
                weight: selectedLocationId === location.id ? 4 : 2.5,
                opacity: 0.9,
                dashArray: "8 6"
              }}
              eventHandlers={{ click: () => onSelectLocation(location.id) }}
            >
              <Tooltip sticky><strong>{location.modernName ?? location.title}</strong><span>{location.modernStatus}</span></Tooltip>
            </Polygon>
          )) : null}

        {visibleLocations.flatMap((location) => {
          const markerCoordinates = location.modernCoordinatePoints
            ?? [location.modernCoordinates ?? location.coordinates];

          return markerCoordinates.map((coordinates, index) => (
            <MapMarker
              key={`${location.id}-${index}`}
              location={location}
              mode={mode}
              coordinateOverride={coordinates}
              active={selectedLocationId === location.id}
              onSelect={onSelectLocation}
            />
          ));
        })}

        <MapFocus selectedLocationId={selectedLocationId} mode={mode} />
        <MapOverviewConstraints mode={mode} />
        <ZoomControl position="bottomright" />
        <ScaleControl position="bottomleft" imperial={false} />
      </MapContainer>

      <div className="map-legend" aria-label="地圖圖例">
        {mode === "historical" ? (
          <>
            <span><i className="route french" />法軍箭線</span>
            <span><i className="route qing" />清軍反擊</span>
            <span><i className="fortification" />城岸防線</span>
            <span><i className="uncertain" />推定範圍</span>
          </>
        ) : (
          <><span><i className="neutral" />13 處史蹟</span><span><i className="uncertain" />舊址參考點</span></>
        )}
      </div>
    </div>
  );
}
