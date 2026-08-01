"use client";

export type HistoricalCoordinate = [number, number];

export interface HistoricalLandUseArea {
  id: string;
  kind: "field" | "forest" | "beach" | "settlement" | "ridge";
  positions: HistoricalCoordinate[];
}

export interface HistoricalLineFeature {
  id: string;
  kind: "waterway" | "road" | "contour" | "shore";
  positions: HistoricalCoordinate[];
}

export const historicalLand: HistoricalCoordinate[] = [
  [25.2110, 121.4020],
  [25.2110, 121.4550],
  [25.1530, 121.4550],
  [25.1530, 121.4480],
  [25.1580, 121.4410],
  [25.1620, 121.4350],
  [25.1660, 121.4290],
  [25.1700, 121.4240],
  [25.1730, 121.4190],
  [25.1755, 121.4155],
  [25.1770, 121.4125],
  [25.1790, 121.4105],
  [25.1820, 121.4090],
  [25.1850, 121.4080],
  [25.1880, 121.4075],
  [25.1920, 121.4070],
  [25.1960, 121.4074],
  [25.2000, 121.4065],
  [25.2040, 121.4050],
  [25.2080, 121.4030]
];

export const historicalLandUseAreas: HistoricalLandUseArea[] = [
  {
    id: "shalun-beach",
    kind: "beach",
    positions: [
      [25.2000, 121.4065], [25.1960, 121.4074], [25.1920, 121.4070],
      [25.1880, 121.4075], [25.1848, 121.4081], [25.1818, 121.4091],
      [25.1788, 121.4108], [25.1765, 121.4132], [25.1782, 121.4146],
      [25.1810, 121.4122], [25.1845, 121.4108], [25.1882, 121.4097],
      [25.1922, 121.4092], [25.1962, 121.4094], [25.2004, 121.4085]
    ]
  },
  {
    id: "shore-obstacle-forest",
    kind: "forest",
    positions: [
      [25.1940, 121.4100], [25.1890, 121.4104], [25.1850, 121.4122],
      [25.1810, 121.4146], [25.1772, 121.4178], [25.1760, 121.4210],
      [25.1793, 121.4202], [25.1826, 121.4177], [25.1862, 121.4150],
      [25.1900, 121.4130], [25.1942, 121.4120]
    ]
  },
  {
    id: "gangziping-fields",
    kind: "field",
    positions: [[25.2070, 121.4090], [25.2070, 121.4350], [25.1982, 121.4360], [25.1974, 121.4120]]
  },
  {
    id: "dazhuang-fields",
    kind: "field",
    positions: [[25.1970, 121.4130], [25.1970, 121.4400], [25.1887, 121.4400], [25.1880, 121.4210], [25.1910, 121.4140]]
  },
  {
    id: "wuciupu-ridge",
    kind: "ridge",
    positions: [[25.1885, 121.4260], [25.1900, 121.4395], [25.1740, 121.4450], [25.1728, 121.4310], [25.1780, 121.4250]]
  },
  {
    id: "gangziping-settlement",
    kind: "settlement",
    positions: [[25.1980, 121.4172], [25.1980, 121.4222], [25.1958, 121.4224], [25.1957, 121.4175]]
  },
  {
    id: "dazhuang-settlement",
    kind: "settlement",
    positions: [[25.1930, 121.4260], [25.1928, 121.4325], [25.1893, 121.4324], [25.1895, 121.4262]]
  },
  {
    id: "zhonglun-settlement",
    kind: "settlement",
    positions: [[25.1850, 121.4222], [25.1848, 121.4274], [25.1815, 121.4272], [25.1818, 121.4223]]
  },
  {
    id: "youchekou-settlement",
    kind: "settlement",
    positions: [[25.1785, 121.4254], [25.1782, 121.4306], [25.1747, 121.4312], [25.1748, 121.4260]]
  }
];

export const historicalLineFeatures: HistoricalLineFeature[] = [
  { id: "historical-shore", kind: "shore", positions: historicalLand.slice(8) },
  {
    id: "company-field-creek",
    kind: "waterway",
    positions: [[25.2110, 121.4275], [25.2070, 121.4240], [25.2030, 121.4193], [25.1990, 121.4147], [25.1960, 121.4105], [25.1940, 121.4073]]
  },
  {
    id: "mifenliao-creek",
    kind: "waterway",
    positions: [[25.1848, 121.4460], [25.1826, 121.4390], [25.1800, 121.4325], [25.1772, 121.4260], [25.1748, 121.4210]]
  },
  {
    id: "jinmugang-drain",
    kind: "waterway",
    positions: [[25.1910, 121.4210], [25.1870, 121.4213], [25.1830, 121.4218], [25.1790, 121.4225], [25.1755, 121.4230]]
  },
  {
    id: "coastal-track",
    kind: "road",
    positions: [[25.2005, 121.4100], [25.1960, 121.4110], [25.1918, 121.4120], [25.1876, 121.4137], [25.1832, 121.4168], [25.1790, 121.4205], [25.1755, 121.4240]]
  },
  {
    id: "gangziping-road",
    kind: "road",
    positions: [[25.1980, 121.4195], [25.1945, 121.4215], [25.1900, 121.4240], [25.1850, 121.4250], [25.1800, 121.4270], [25.1755, 121.4290]]
  },
  {
    id: "dazhuang-road",
    kind: "road",
    positions: [[25.1930, 121.4295], [25.1880, 121.4300], [25.1830, 121.4310], [25.1780, 121.4320], [25.1730, 121.4345]]
  },
  {
    id: "contour-40",
    kind: "contour",
    positions: [[25.1900, 121.4275], [25.1880, 121.4320], [25.1840, 121.4355], [25.1795, 121.4365], [25.1750, 121.4340]]
  },
  {
    id: "contour-60",
    kind: "contour",
    positions: [[25.1880, 121.4305], [25.1850, 121.4350], [25.1810, 121.4380], [25.1768, 121.4370]]
  },
  {
    id: "contour-80",
    kind: "contour",
    positions: [[25.1855, 121.4335], [25.1825, 121.4370], [25.1790, 121.4390], [25.1765, 121.4380]]
  },
  { id: "field-boundary-north", kind: "road", positions: [[25.2040, 121.4100], [25.2040, 121.4340]] },
  { id: "field-boundary-center", kind: "road", positions: [[25.1990, 121.4120], [25.1990, 121.4380]] },
  { id: "field-boundary-east", kind: "road", positions: [[25.1940, 121.4160], [25.1940, 121.4410]] }
];