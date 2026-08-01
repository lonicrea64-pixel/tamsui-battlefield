export type Faction = "qing" | "french" | "civilian" | "neutral";
export type FactionFilter = "all" | Faction;
export type MapMode = "historical" | "modern";
export type LocationAccuracy = "verified" | "documented-area" | "approximate";
export type SiteGeometryKind = "point" | "line" | "area";
export type LocationCategory =
  | "landing"
  | "battery"
  | "battlefield"
  | "defense"
  | "heritage"
  | "medical"
  | "memory"
  | "command";
export type LayerKey = "sites" | "routes" | "defenses" | "zones" | "fleet";

export type TacticalSymbolKind =
  | "french-base"
  | "qing-position"
  | "battery"
  | "mine"
  | "sunken-ship"
  | "landing"
  | "signal"
  | "battle";

export interface SourceReference {
  label: string;
  url: string;
  note?: string;
}

export interface SitePhoto {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
}

export interface HistoricalLocation {
  id: string;
  brochureIndex: number;
  title: string;
  ancientName?: string;
  modernName?: string;
  coordinates: [number, number];
  modernCoordinates?: [number, number];
  accuracy: LocationAccuracy;
  accuracyNote: string;
  category: LocationCategory;
  faction: Faction;
  period: "battle" | "postwar" | "both";
  firstPhase: number;
  summary: string;
  detail: string;
  strategicMeaning: string;
  historicalSignificance: string;
  facts: string[];
  relatedEventIds: string[];
  imageCaption: string;
  modernAddress?: string;
  modernStatus?: string;
  todayIntro?: string;
  todayPhoto?: SitePhoto;
  modernPhotoUrl?: string;
  showInModern?: boolean;
  sources: SourceReference[];
}

export interface HistoricalSiteGeometry {
  locationId: string;
  kind: SiteGeometryKind;
  positions: Array<[number, number]>;
  labelPosition: [number, number];
  note: string;
}

export interface TacticalSymbol {
  id: string;
  title: string;
  kind: TacticalSymbolKind;
  coordinates: [number, number];
  faction: Faction | "mixed";
  startPhase: number;
  endPhase: number;
  note: string;
  accuracy: LocationAccuracy;
}

export interface MapLabel {
  id: string;
  title: string;
  coordinates: [number, number];
  kind: "water" | "settlement" | "terrain";
}

export interface BattleEvent {
  id: string;
  phase: number;
  date: string;
  time?: string;
  title: string;
  shortTitle: string;
  summary: string;
  detail: string;
  faction: Faction | "mixed";
  locationIds: string[];
}

export interface BattleRoute {
  id: string;
  title: string;
  faction: "qing" | "french";
  kind: "advance" | "retreat" | "deployment";
  positions: Array<[number, number]>;
  startPhase: number;
  endPhase: number;
  accuracy: LocationAccuracy;
}

export interface DefenseLine {
  id: string;
  title: string;
  positions: Array<[number, number]>;
  startPhase: number;
  endPhase: number;
  accuracy: LocationAccuracy;
  note: string;
}

export interface BattleZone {
  id: string;
  title: string;
  center: [number, number];
  radius: number;
  faction: Faction | "mixed";
  startPhase: number;
  endPhase: number;
  accuracy: LocationAccuracy;
}


export interface HistoricalPerson {
  id: string;
  name: string;
  originalName?: string;
  lifeSpan?: string;
  faction: Faction;
  campLabel: string;
  role: string;
  lead: string;
  biography: string[];
  battleRole: string;
  legacy: string;
  relatedLocationIds: string[];
  relatedPlaces: Array<{
    locationId: string;
    phase: number;
    note: string;
  }>;
  portrait?: SitePhoto;
  sources: SourceReference[];
}

export interface ArchiveStory {
  id: string;
  chapter: string;
  title: string;
  lead: string;
  paragraphs: string[];
  keyFacts: string[];
  sourceNote: string;
}

export interface WarSection {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
  facts?: Array<{ label: string; value: string }>;
}
