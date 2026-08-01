import { SiteDetail, TimelineEvent } from "./types.js";

export const sites: SiteDetail[] = [
  {
    id: "hobe-fort",
    name: "滬尾砲台",
    shortDescription: "淡水河口重要防禦據點，協助阻止法軍深入港口與內陸。",
    coordinates: { lat: 25.1739, lng: 121.4328 },
    mapPosition: { xPercent: 42, yPercent: 45 },
    tags: ["砲台", "清軍防線"],
    historicalContext:
      "1884 年清法戰爭期間，淡水河口是北台灣防務關鍵。砲台、河口地形與守軍部署共同形成阻擋法軍登陸後推進的防線。",
    keyFacts: [
      "淡水戰役發生於 1884 年 10 月 8 日。",
      "滬尾砲台是淡水河口防衛的重要節點。",
      "地形、火力與地方防衛力量共同影響戰役結果。"
    ],
    quiz: {
      question: "滬尾砲台在淡水戰役中的主要功能是什麼？",
      options: [
        { id: "a", label: "協助防守河口並限制法軍推進" },
        { id: "b", label: "作為商船補給倉庫" },
        { id: "c", label: "作為法軍登陸後的指揮所" }
      ],
      correctOptionId: "a",
      explanation: "滬尾砲台與河口防線結合，讓法軍難以在登陸後快速擴大戰果。"
    },
    nextSiteId: "shalun-landing"
  },
  {
    id: "shalun-landing",
    name: "沙崙登陸點",
    shortDescription: "法軍嘗試登陸並突破淡水防線的位置。",
    coordinates: { lat: 25.1822, lng: 121.4112 },
    mapPosition: { xPercent: 23, yPercent: 56 },
    tags: ["登陸點", "法軍行動"],
    historicalContext:
      "法軍在沙崙一帶登陸後，試圖向淡水推進。由於守軍反擊、地形限制與補給壓力，攻勢未能達成預期效果。",
    keyFacts: [
      "沙崙海岸是法軍登陸淡水的重要位置。",
      "登陸行動需要艦隊火力與岸上部隊密切協同。",
      "清軍與地方防衛力量阻止法軍深入。"
    ],
    quiz: {
      question: "法軍選擇沙崙登陸的主要戰術考量是什麼？",
      options: [
        { id: "a", label: "接近淡水河口，可威脅港口與防線" },
        { id: "b", label: "該處遠離所有守軍，不需戰鬥" },
        { id: "c", label: "主要目標是建立長期商港" }
      ],
      correctOptionId: "a",
      explanation: "沙崙靠近淡水河口，是能對淡水防線形成壓力的登陸區。"
    },
    nextSiteId: "river-mouth-line"
  },
  {
    id: "river-mouth-line",
    name: "淡水河口防線",
    shortDescription: "河口地形、砲台與守軍部署共同形成的防衛系統。",
    coordinates: { lat: 25.1794, lng: 121.4263 },
    mapPosition: { xPercent: 36, yPercent: 52 },
    tags: ["河口", "防線"],
    historicalContext:
      "淡水河口連結港口、街區與內陸交通。守軍利用河口與沙洲地形，降低法軍登陸後的機動性。",
    keyFacts: [
      "河口是艦隊、登陸部隊與岸防火力交會的空間。",
      "地形限制使攻方難以快速展開兵力。",
      "防線設計保護通往台北方向的交通。"
    ],
    quiz: {
      question: "淡水河口防線最重要的地理優勢是什麼？",
      options: [
        { id: "a", label: "能限制艦隊與登陸部隊的行動空間" },
        { id: "b", label: "完全沒有自然障礙" },
        { id: "c", label: "遠離淡水街區，因此無戰略價值" }
      ],
      correctOptionId: "a",
      explanation: "河口地形讓攻方難以同時掌握航道、登陸點與內陸推進路線。"
    },
    nextSiteId: "fort-san-domingo"
  },
  {
    id: "fort-san-domingo",
    name: "紅毛城周邊",
    shortDescription: "淡水歷史地景的重要節點，可作為理解港口與城市發展的參照。",
    coordinates: { lat: 25.1785, lng: 121.4314 },
    mapPosition: { xPercent: 47, yPercent: 40 },
    tags: ["歷史地景", "港口城市"],
    historicalContext:
      "紅毛城與淡水港口歷史密切相關。雖非淡水戰役唯一核心戰場，但其位置有助於理解淡水作為港口城市的長期戰略意義。",
    keyFacts: [
      "紅毛城周邊能連結淡水更長期的殖民、貿易與軍事歷史。",
      "港口城市的地景變化會影響戰爭時期的路線與防務。",
      "適合做為導覽終點，回顧戰役與城市記憶。"
    ],
    quiz: {
      question: "紅毛城周邊在這個專案中的主要用途是什麼？",
      options: [
        { id: "a", label: "作為淡水港口與城市歷史的延伸參照" },
        { id: "b", label: "作為法軍唯一登陸點" },
        { id: "c", label: "作為完全無關的現代景點" }
      ],
      correctOptionId: "a",
      explanation: "紅毛城周邊能把戰役敘事延伸到淡水港口城市的長期歷史。"
    },
    nextSiteId: "hobe-fort"
  }
];

export const timeline: TimelineEvent[] = [
  {
    id: "evt-1884-08-05",
    date: "1884-08-05",
    title: "清法戰爭擴大",
    description: "中法衝突延伸到台灣周邊，法軍開始以海上力量壓迫北台灣。"
  },
  {
    id: "evt-1884-10-01",
    date: "1884-10-01",
    title: "淡水防務緊張",
    description: "淡水河口、港口與街區防線進入高度戒備。",
    relatedSiteId: "river-mouth-line"
  },
  {
    id: "evt-1884-10-08",
    date: "1884-10-08",
    title: "淡水戰役",
    description: "法軍嘗試登陸淡水，但遭清軍與地方防衛力量反擊後撤退。",
    relatedSiteId: "shalun-landing"
  },
  {
    id: "evt-1885-04-04",
    date: "1885-04-04",
    title: "戰事逐步結束",
    description: "清法戰爭後期局勢轉向，台灣北部防務經驗也影響後續治理與建設。"
  }
];

export function getSiteById(siteId: string): SiteDetail | undefined {
  return sites.find((site) => site.id === siteId);
}
