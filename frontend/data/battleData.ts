import {
  BattleEvent,
  BattleRoute,
  BattleZone,
  DefenseLine,
  HistoricalLocation,
  HistoricalSiteGeometry,
  LayerKey,
  MapLabel,
  TacticalSymbol
} from "@/types/historical";

const brochure = {
  label: "2004《淡水古戰場》史蹟暨導覽地圖、地圖史話",
  url: "#source-note",
  note: "收錄滬尾古戰場十三處地點、戰役進程與地方史話。"
};

const museumBattle = {
  label: "新北市立淡水古蹟博物館：1884 滬尾之役",
  url: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0K258525646375234148&xsmsid=0K255571641497878724"
};

const museumRoute = {
  label: "新北市立淡水古蹟博物館：清法戰爭滬尾之役文化路徑",
  url: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0K270601799239893543&xsmsid=0K268371586810113165"
};

const gisReport = {
  label: "《清法戰爭滬尾之役 GIS 先期調查研究成果報告》",
  url: "https://www.tshs.ntpc.gov.tw/files/file_pool/1/0K091416262552535770/%E6%B8%85%E6%B3%95%E6%88%B0%E7%88%AD%E6%BB%AC%E5%B0%BE%E4%B9%8B%E5%BD%B9%E8%AA%BF%E6%9F%A5%E7%A0%94%E7%A9%B6%E8%A8%88%E7%95%AB%E7%AC%AC%E4%BA%8C%E6%9C%9F%EF%BC%8D%E5%9C%B0%E7%90%86%E8%B3%87%E8%A8%8A%E7%B3%BB%E7%B5%B1%28GIS%29%E5%85%88%E6%9C%9F%E8%AA%BF%E6%9F%A5%E7%A0%94%E7%A9%B6%20%E6%88%90%E6%9E%9C%E5%A0%B1%E5%91%8A%E6%9B%B8.pdf"
};

const historicalBasemapSource = {
  label: "中央研究院 GIS 專題中心：1904 年《臺灣堡圖（明治版）》",
  url: "https://gis.sinica.edu.tw/tileserver/",
  note: "保存二十世紀初淡水的海岸、水系、聚落與地名，可與戰役前後地貌相互參照。"
};

const hobeFortSource = {
  label: "新北市立淡水古蹟博物館：滬尾礮臺",
  url: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0K268553677506787280&xsmsid=0K268371586810113165"
};

const sufuSource = {
  label: "新北市立淡水古蹟博物館：蘇府王爺廟",
  url: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0K268573068126972687&xsmsid=0K268371586810113165"
};

const bathSource = {
  label: "國立臺灣歷史博物館：淡水海水浴場",
  url: "https://collections.nmth.gov.tw/CollectionContent.aspx?a=132&rno=2001.008.0999"
};

const cemeterySource = {
  label: "國家文化記憶庫：淡水外僑墓園",
  url: "https://tcmb.culture.tw/zh-tw/detail?id=19980829000003&indexCode=BOCH_CountryCulture_11"
};

const wanshanSource = {
  label: "國家文化記憶庫：淡水大庄萬善堂",
  url: "https://tcmb.culture.tw/zh-tw/detail?id=550848&indexCode=Culture_Place"
};

export const defaultLayers: Record<LayerKey, boolean> = {
  terrain: true,
  barriers: true,
  battleZones: true,
  facilities: true,
  troops: true,
  fleet: true,
  heritage: true
};

export const locationMarkerGlyphs: Record<string, string> = {
  "shalun-landing": "登",
  "city-bank-remains": "外",
  "wanshan-memorial": "善",
  "alleged-french-cemetery": "僑",
  "hobe-fort": "砲",
  "mackay-clinic": "醫",
  "tiansheng-battlefield": "戰",
  "sufu-temple": "廟",
  "white-battery": "白",
  "thorn-forest": "林",
  "old-bathing-beach": "浴",
  "wanggao-tower": "樓",
  "shihujiao": "石"
};

export const locations: HistoricalLocation[] = [
  {
    id: "shalun-landing",
    brochureIndex: 1,
    title: "法軍登陸點",
    ancientName: "沙崙海灘",
    modernName: "沙崙海岸",
    coordinates: [25.190054, 121.416014],
    accuracy: "verified",
    accuracyNote: "登陸與撤退均發生在沙崙海灘。位置依戰場圖所示的舊沙岸窄帶標定；現代填海、港區與海岸工程已改變靠岸線。",
    category: "landing",
    faction: "french",
    period: "battle",
    firstPhase: 5,
    summary: "1884 年 10 月 8 日上午，約六百名法軍及工兵分乘小艇，在沙崙海灘登陸。",
    detail: "法軍約於 9 時 35 分開始上岸，分成三股向內陸推進。沙灘便於小艇接近，卻也是部隊與艦隊之間唯一穩定的往返通道；下午撤退時，各連仍須回到沙崙涉水登艇。",
    strategicMeaning: "登陸後的法軍必須穿越海岸灌叢、圳溝與濕地，艦砲視線與步兵聯絡逐步受阻。灘頭一旦失去秩序，退路便會直接受到威脅。",
    historicalSignificance: "沙崙保存了滬尾之役由海上轉入陸戰的空間關係。今日海岸已變形，仍可由河口、外海與內陸方向辨認登陸行動的基本軸線。",
    facts: ["10 月 8 日約 9 時 35 分開始登陸", "登陸部隊約六百人，另有工兵分隊", "撤退與重新登艇仍由沙崙海灘進行"],
    relatedEventIds: ["landing-three-prongs", "boats-clear-beach"],
    imageCaption: "沙崙登陸與撤退海岸",
    modernAddress: "新北市淡水區沙崙海岸",
    modernStatus: "舊沙岸已受填築與港區工程改變，登陸位置應以海岸帶理解。",
    todayIntro: "今日沙崙的堤岸、道路與港區並非 1884 年地貌。由現地向西可辨外海艦隊方向，向東則是法軍進入林叢與濕地的推進方向。",
    todayPhoto: {
      src: "/images/sites/shalun.jpg",
      alt: "今日沙崙海岸",
      caption: "今日沙崙海岸；海岸線已受現代工程改變。",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Shalun_Seaside_Resort"
    },
    sources: [brochure, museumRoute, gisReport]
  },
  {
    id: "city-bank-remains",
    brochureIndex: 2,
    title: "外城岸遺址",
    ancientName: "沙崙外城岸",
    modernName: "清法戰爭滬尾古戰場城岸遺蹟",
    coordinates: [25.185825, 121.419468],
    modernCoordinatePoints: [[25.189237, 121.420349], [25.187667, 121.419003]],
    accuracy: "documented-area",
    accuracyNote: "外城岸線位依沙崙至瓦店埤西側的戰場圖重新標定；現存殘段受到道路、校地與後續工程切割，各段年代仍須分別判讀。",
    category: "defense",
    faction: "qing",
    period: "both",
    firstPhase: 0,
    summary: "外城岸沿沙崙內側向南延伸，以土堤與壕溝阻止登陸部隊直接穿越開闊地深入中崙。",
    detail: "第 2 號標示外城岸走向；內城岸另沿烏啾埔高地、大庄與港子平方向構成第二道防線。現存土堤可能同時包含戰時修築與戰後補強，不能把所有殘段視為年代一致的完整城牆。",
    strategicMeaning: "城岸迫使進攻者改道進入林叢、濕地與狹窄通路。清軍可利用土堤後方集結兵力，再從北、中、南各方向反擊。",
    historicalSignificance: "殘存土堤是少數仍可由地形直接辨認的古戰場遺構，也記錄了戰時築防與戰後海防整備的延續。",
    facts: ["第 2 號標示沙崙外城岸", "內城岸另沿烏啾埔、大庄與港子平延伸", "現存線段的年代與 1884 年配置仍須分段判讀"],
    relatedEventIds: ["landing-three-prongs", "forest-melee"],
    imageCaption: "城岸土堤與壕溝現況",
    modernStatus: "部分土堤仍存，其餘已被道路、住宅與基地切割。",
    todayIntro: "沙崙停車場與後備學校附近仍可辨識土堤高差。這些殘段反映防禦工程的走向，但不等於一條保存完整、年代單一的城牆。",
    modernPhotoUrl: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0L280540940606603378&xsmsid=0L279341464575735818",
    sources: [brochure, museumRoute, gisReport]
  },
  {
    id: "wanshan-memorial",
    brochureIndex: 3,
    title: "萬善堂清勇墓碑",
    ancientName: "大庄埔清軍墓葬記憶",
    modernName: "淡水大庄萬善堂",
    coordinates: [25.186311, 121.429611],
    accuracy: "verified",
    accuracyNote: "現址可確認；堂內墓碑與遺骨經過發現、遷移與重新安置，並非 1884 年原始埋葬位置。",
    category: "memory",
    faction: "civilian",
    period: "postwar",
    firstPhase: 12,
    summary: "萬善堂保存清勇墓碑與遺骨，承接戰死者、病故者及後來遷葬所形成的地方祭祀。",
    detail: "1979 年高爾夫球場擴建時發現湘軍、淮軍墓碑與遺骸，地方人士其後收存，並於 1983 年整修萬善堂。現址所見是戰後祭祀與遷葬逐步形成的結果。",
    strategicMeaning: "萬善堂不屬 10 月 8 日前線工事。它位於大庄防區後方，呈現軍隊駐防、死亡與地方收埋之間的關係。",
    historicalSignificance: "墓碑留下部隊來源與個人死亡的線索，使戰爭史不只由將領、戰報與勝負構成。",
    facts: ["1979 年工程中發現墓碑與遺骸", "1983 年地方人士整修安置", "保存湘軍、淮軍等清勇記憶"],
    relatedEventIds: ["treaty"],
    imageCaption: "萬善堂內清勇墓碑",
    modernAddress: "新北市淡水區大庄里",
    modernStatus: "現為祭祀與收存空間，位置可確認。",
    todayIntro: "堂內文物反映墓碑發現、遺骨遷移與地方祭祀的歷程。閱讀碑文時，須區分原葬地與今日安置地。",
    todayPhoto: {
      src: "/images/sites/wanshan.jpg",
      alt: "今日淡水大庄萬善堂",
      caption: "萬善堂保存清勇墓碑與遷葬記憶。",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Dazhuang_Wanshan_Temple"
    },
    sources: [brochure, wanshanSource, gisReport]
  },
  {
    id: "alleged-french-cemetery",
    brochureIndex: 4,
    title: "淡江高中外僑墓園",
    ancientName: "西仔墓",
    modernName: "淡江高中外僑墓園",
    coordinates: [25.17698, 121.438051],
    accuracy: "verified",
    accuracyNote: "墓園位於淡江高中校園內，現址可確認；它是外僑墓園，不是清法戰爭法國軍人公墓。",
    category: "memory",
    faction: "neutral",
    period: "postwar",
    firstPhase: 12,
    summary: "淡江高中校園內的外僑墓園俗稱「西仔墓」，曾長期被地圖誤標為法國軍人公墓。墓園葬有 76 名外國人，其中僅一人為法國人，且並非清法戰爭陣亡者。",
    detail: "墓園中唯一的法國人是中國海關洋員李運華（Lepold Lefebvre，1826.1.12－1878.11.20），巴黎人，曾任海關稅務司駐基隆二等幫辦；他在 1878 年去世，早於清法戰爭六年。淡水人對「西仔反」的記憶，使「番仔墓」與「西仔墓」逐漸混稱，政府製圖又沿用為法國軍人公墓。戰場上的法軍遺體據傳曾暫置紅毛城門前的「福堂」，戰後依協約處理，並未葬入英國領事館管轄的外僑墓園。",
    strategicMeaning: "墓園不屬 1884 年戰鬥部署。它記錄的是淡水開港後的外僑社群，以及地名、口述記憶與政府製圖彼此混淆的過程。",
    historicalSignificance: "墓園內與清法戰爭直接相關者，是德國人巴恩士。他受劉銘傳聘用，參與監造砲臺與訓練砲兵，1892 年去世；墓碑所刻「欽賜雙龍三等第一」為其勳銜。",
    facts: ["墓園位於淡江高中校園內，共葬有 76 名外國人", "唯一的法國墓主李運華於 1878 年去世，並非戰死", "德國人巴恩士曾受劉銘傳聘用監造砲臺、訓練砲兵"],
    relatedEventIds: ["treaty"],
    imageCaption: "淡江高中外僑墓園現況",
    modernStatus: "墓園仍存於淡江高中校園內，已列為古蹟。",
    todayIntro: "現存墓碑記錄淡水開港後的外僑社群。將此處視為法軍集體墓地，是地名混稱與歷年製圖沿用造成的誤解。",
    modernPhotoUrl: "https://jp.tshs.ntpc.gov.tw/xmdoc/cont?sid=0G292328210270752519&xsmsid=0G291702124812132165",
    sources: [brochure, cemeterySource, gisReport]
  },
  {
    id: "hobe-fort",
    brochureIndex: 5,
    title: "滬尾礮臺",
    ancientName: "戰後新式海防礮臺",
    modernName: "國定古蹟滬尾礮臺",
    coordinates: [25.179379, 121.428941],
    accuracy: "verified",
    accuracyNote: "礮臺現址可確認；建築於 1884 年戰後興建，沒有參與 10 月 2 日砲戰。",
    category: "heritage",
    faction: "qing",
    period: "postwar",
    firstPhase: 12,
    summary: "劉銘傳在清法戰爭後主持興建滬尾礮臺，以新式封閉砲臺加強淡水河口海防。",
    detail: "礮臺約於 1886 年起建，1889 年前後完成火砲配置。厚土、磚石與混凝土保護砲位；1884 年遭法艦轟擊的則是沙崙、中崙與油車口等舊式砲臺。",
    strategicMeaning: "礮臺控制淡水河口與烏啾埔高地，是戰後重新規劃北臺灣海防的核心工程，不應回置為 1884 年既有火力點。",
    historicalSignificance: "完整保存的甬道、土垣與砲座，記錄清廷在戰後引進西式工程、重整軍備與海防體系的具體成果。",
    facts: ["1884 年戰後開始籌建", "約於 1889 年完成火砲配置", "不是 10 月 2 日受轟的舊砲臺"],
    relatedEventIds: ["treaty"],
    imageCaption: "滬尾礮臺入口、甬道與砲座",
    modernAddress: "新北市淡水區中正路一段 6 巷 34 號",
    modernStatus: "國定古蹟，主要構造保存完整並開放參觀。",
    todayIntro: "現存礮臺反映的是戰後海防改革。其位置與烏啾埔高地相連，但建築年代晚於滬尾之役。",
    todayPhoto: {
      src: "/images/sites/hobe-fort.jpg",
      alt: "今日滬尾礮臺",
      caption: "滬尾礮臺為戰後海防現代化的重要遺構。",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Hobe_Fort"
    },
    sources: [brochure, hobeFortSource]
  },
  {
    id: "mackay-clinic",
    brochureIndex: 6,
    title: "滬尾偕醫館",
    ancientName: "偕醫館",
    modernName: "滬尾偕醫館",
    coordinates: [25.171828, 121.438552],
    accuracy: "verified",
    accuracyNote: "1879 年落成的建築仍在原址，位置可確認。",
    category: "medical",
    faction: "neutral",
    period: "both",
    firstPhase: 0,
    summary: "偕醫館位於滬尾街，見證砲擊、傷患救護、外僑避難與港市居民的戰時生活。",
    detail: "馬偕建立的醫療據點於 1879 年落成。清法戰爭期間，港市受到砲火與封鎖影響，醫療、避難及外僑社群的往來因而成為戰場之外的重要課題。",
    strategicMeaning: "偕醫館位於前線後方的港市，不是砲臺或軍隊基地；它連接傷患救護、外僑情報與居民避難。",
    historicalSignificance: "建築保存至今，使滬尾之役的傷病、醫療技術與跨文化社群有可辨認的實體場所。",
    facts: ["1879 年落成", "位於滬尾街外僑活動範圍", "不是軍事據點"],
    relatedEventIds: ["bombardment", "treaty"],
    imageCaption: "滬尾偕醫館現存建築",
    modernAddress: "新北市淡水區馬偕街 6 號",
    modernStatus: "市定古蹟，建築仍存。",
    todayIntro: "偕醫館保存港市醫療的實體空間，也提供理解傷患、外僑與居民如何經歷戰爭的入口。",
    todayPhoto: {
      src: "/images/sites/mackay-clinic.jpg",
      alt: "今日滬尾偕醫館",
      caption: "偕醫館現存建築。",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:%E6%B7%A1%E6%B0%B4%E8%97%9D%E9%81%8A%E7%B6%B2--%E6%BB%AC%E5%B0%BE%E5%81%95%E9%86%AB%E9%A4%A8.JPG"
    },
    sources: [brochure, museumRoute]
  },
  {
    id: "tiansheng-battlefield",
    brochureIndex: 7,
    title: "天生國小舊戰場",
    ancientName: "中崙、金目港仔與瓦店埤接戰帶",
    modernName: "天生國小及周邊",
    coordinates: [25.181183, 121.425116],
    accuracy: "documented-area",
    accuracyNote: "天生國小是現代定位錨點；主要接戰帶由校園附近延伸至金目港仔、瓦店埤與中崙，不能縮成校門前的一個點。",
    category: "battlefield",
    faction: "qing",
    period: "both",
    firstPhase: 5,
    summary: "天生國小及周邊覆蓋滬尾之役的主要接戰帶，法軍在此受到濕地、圳溝、灌叢與清軍反擊牽制。",
    detail: "金目港仔濕地由今日天生國小附近向南延伸至瓦店埤。法軍由沙崙進入中崙後，隊形被水路與林叢切割；清軍隔著濕地射擊，並在瓦店埤、小橋與通路附近發生近身戰。",
    strategicMeaning: "此地是沙岸開闊地轉入濕地與聚落通路的關鍵。地形削弱法軍密集火力與連隊聯絡，使清軍得以由北、中、南方向合擊。",
    historicalSignificance: "校園與住宅覆蓋舊戰場，金目港仔水系、瓦店埤位置與中崙舊地名仍保留判讀 1884 年戰場的線索。",
    facts: ["主要接戰帶由天生國小附近延伸至瓦店埤", "金目港仔濕地曾寬逾 30 公尺", "瓦店埤與小橋附近發生激烈近身戰"],
    relatedEventIds: ["forest-melee", "reserve-ambushed"],
    imageCaption: "天生國小及周邊舊戰場",
    modernAddress: "新北市淡水區淡海路 72 巷 26 號",
    modernStatus: "現為校園與住宅區，舊濕地和圳溝多已改造。",
    todayIntro: "校址可確認主要接戰帶的東側位置；真正的戰場向西延伸到金目港仔濕地、瓦店埤與沙崙方向。",
    modernPhotoUrl: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0K258537220127054073&xsmsid=0K255571641497878724",
    sources: [brochure, museumBattle, museumRoute, gisReport]
  },
  {
    id: "sufu-temple",
    brochureIndex: 8,
    title: "蘇府王爺廟",
    ancientName: "油車口水港廟",
    modernName: "油車口忠義宮蘇府王爺廟",
    coordinates: [25.176619, 121.426692],
    accuracy: "verified",
    accuracyNote: "廟址可確認；王爺顯靈退敵屬地方信仰記憶，不能直接作為軍事部署證據。",
    category: "memory",
    faction: "civilian",
    period: "both",
    firstPhase: 0,
    summary: "油車口蘇府王爺廟保存地方社會對滬尾之役、守土與神助的集體記憶。",
    detail: "廟宇又稱水陸廟，主祀蘇府王爺。地方相傳王爺顯靈協助退敵，章高元曾敬獻「威靈赫濯」匾；現懸匾額為後來仿製。",
    strategicMeaning: "廟址位於油車口聚落，接近白砲臺、水雷營與濕地南端。其地理位置與戰場相關，神助傳說則屬戰後形成並延續的地方敘事。",
    historicalSignificance: "廟宇保存居民理解戰爭的方式，與軍方戰報、外國紀錄共同構成滬尾之役的多重記憶。",
    facts: ["又稱水陸廟", "1853 年向清政府登記", "保存蘇府王爺顯靈退敵傳說"],
    relatedEventIds: ["forest-melee", "treaty"],
    imageCaption: "油車口忠義宮蘇府王爺廟",
    modernAddress: "新北市淡水區中正路一段 32 號",
    modernStatus: "廟宇仍持續祭祀並參與地方活動。",
    todayIntro: "現址與油車口聚落位置相符。廟中傳說呈現居民如何記憶戰役，軍事行動仍須依戰報與戰場研究判讀。",
    modernPhotoUrl: "https://tsreligion.au.edu.tw/p/406-1077-74380%2Cr11.php?Lang=zh-tw",
    sources: [brochure, sufuSource, museumRoute]
  },
  {
    id: "white-battery",
    brochureIndex: 9,
    title: "白砲臺遺址",
    ancientName: "油車口白砲臺",
    modernName: "海巡署艦隊分署附近",
    coordinates: [25.177200, 121.420104],
    modernCoordinates: [25.176747, 121.42158],
    accuracy: "documented-area",
    accuracyNote: "白砲臺已不存。官方文化路徑將位置定在金目港溪出海口南岸、約今日海巡署艦隊分署附近。",
    category: "battery",
    faction: "qing",
    period: "battle",
    firstPhase: 0,
    summary: "白砲臺位於油車口河岸，控制淡水河口與沉船、水雷所構成的阻絕線。",
    detail: "白砲臺原為舊式海防砲位，1884 年再以沙包補強並配置克虜伯砲。10 月 2 日法艦砲擊後砲位受損；其所在河岸與後來興建的淡水港燈塔並非同一設施。",
    strategicMeaning: "砲臺火力與載石沉船、填石和水雷共同封鎖航道，目的在阻止法艦駛入淡水河、直達臺北盆地。",
    historicalSignificance: "原砲位雖已消失，河口、金目港溪口與阻絕線的相對位置仍可說明清軍如何把火砲與水下障礙結合。",
    facts: ["位於金目港溪口南岸", "1884 年以沙包補強並配置克虜伯砲", "與沉船、水雷共同封鎖河口"],
    relatedEventIds: ["bombardment", "river-probe"],
    imageCaption: "白砲臺所在河岸與今日海巡設施附近",
    modernAddress: "新北市淡水區中正路一段、海巡署艦隊分署附近",
    modernStatus: "舊砲臺已消失，附近河岸仍可辨認其防守方向。",
    todayIntro: "白砲臺位置約在今日海巡署艦隊分署附近；淡水港燈塔是後來設施，不能視為白砲臺本體。",
    todayPhoto: {
      src: "/images/sites/tamsui-lighthouse.jpg",
      alt: "今日淡水河口與淡水港燈塔",
      caption: "淡水港燈塔位於同一河口防區，但不是 1884 年白砲臺。",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Tamsui_Harbor_Lighthouse"
    },
    sources: [brochure, gisReport, museumRoute]
  },
  {
    id: "thorn-forest",
    brochureIndex: 10,
    title: "金針木耳林",
    ancientName: "林投、黃槿阻障林",
    modernName: "沙崙至金目港仔間舊林帶",
    coordinates: [25.180683, 121.418698],
    modernCoordinates: [25.190333, 121.419165],
    modernArea: [[25.191296, 121.419326], [25.191111, 121.418922], [25.190833, 121.418498], [25.190648, 121.418195], [25.190370, 121.417852], [25.190185, 121.417952], [25.190000, 121.418155], [25.189722, 121.418518], [25.189444, 121.418963], [25.189352, 121.419165], [25.189444, 121.419387], [25.189630, 121.419670], [25.189815, 121.419872], [25.190000, 121.420094], [25.190185, 121.420336], [25.190370, 121.420417], [25.190556, 121.420357], [25.190741, 121.420195], [25.190926, 121.419953], [25.191111, 121.419670]],
    accuracy: "documented-area",
    accuracyNote: "「金針木耳林」是由林投、黃槿等海岸植物構成的帶狀地景，舊林帶多已消失，只能依戰圖與歷史地貌表示其大致範圍。",
    category: "battlefield",
    faction: "qing",
    period: "battle",
    firstPhase: 5,
    summary: "林投尖刺與黃槿交纏枝葉形成密集阻障，法軍進入後難以維持隊形、視線與連隊聯絡。",
    detail: "法軍從沙崙沙岸向中崙推進時，須穿越海岸灌叢與狹窄通路。長槍、密集射擊與中隊指揮在林內受到限制，清軍則可利用熟悉路徑由林緣與側翼接近。",
    strategicMeaning: "阻障林減慢推進速度，迫使隊形分散，並使法軍逐步離開艦砲直接支援。它與濕地、圳溝、城岸及清軍反擊共同造成戰術失序。",
    historicalSignificance: "舊林帶多被道路與住宅取代；林投、黃槿的復育與地方記憶仍保留海岸植物參與戰場形成的環境史。",
    facts: ["「金針」指林投", "「木耳」指黃槿", "舊林帶位於沙灘與金目港仔濕地之間"],
    relatedEventIds: ["forest-melee", "reserve-ambushed"],
    imageCaption: "林投與黃槿形成的海岸阻障",
    modernStatus: "原有連續林帶大多消失，僅存零星植被與復育展示。",
    todayIntro: "零星林投與黃槿可說明尖刺、纏繞枝幹和遮蔽視線如何影響步兵；它們並不是完整的 1884 年林帶復原。",
    modernPhotoUrl: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0L279573296615199813&xsmsid=0L279340990217665891",
    sources: [brochure, museumBattle, gisReport]
  },
  {
    id: "old-bathing-beach",
    brochureIndex: 11,
    title: "淡水海水浴場舊址",
    ancientName: "沙崙海岸",
    modernName: "淡水海水浴場舊址",
    coordinates: [25.189425, 121.417391],
    modernCoordinates: [25.189425, 121.417391],
    accuracy: "documented-area",
    accuracyNote: "海水浴場位於沙崙大片沙灘，設施已不存；其範圍與 1884 年登陸海岸部分重疊。",
    category: "heritage",
    faction: "neutral",
    period: "postwar",
    firstPhase: 12,
    summary: "沙崙海岸在日治時期成為淡水海水浴場，原有登陸沙岸轉作公共休閒空間。",
    detail: "淡水海水浴場於 1904 年設立，1920 年改建公共休憩所。浴場使用同一片沙岸，後來又因港灣、填海與交通工程而改變。",
    strategicMeaning: "海水浴場不屬 1884 年戰場設施；其舊址有助於重建當時沙灘的寬度與可登陸性。",
    historicalSignificance: "戰場、浴場與現代港區先後占用同一海岸，呈現沙崙地景從軍事通道轉為休閒場所，再進入工程開發的變化。",
    facts: ["1904 年設立", "1920 年改建公共休憩所", "浴場沙灘與法軍登陸帶部分重疊"],
    relatedEventIds: ["landing-three-prongs", "boats-clear-beach"],
    imageCaption: "日治時期淡水海水浴場與今日沙崙",
    modernStatus: "浴場設施已不存，原有沙灘受港區與海岸工程改變。",
    todayIntro: "今日沙崙仍可辨識海岸方向，但浴場建築與完整沙灘景觀已消失。歷史照片可補充現地無法保留的海岸尺度。",
    todayPhoto: {
      src: "/images/sites/shalun.jpg",
      alt: "今日沙崙海岸",
      caption: "今日沙崙海岸；舊海水浴場設施已不存。",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Shalun_Seaside_Resort"
    },
    sources: [brochure, bathSource, gisReport]
  },
  {
    id: "wanggao-tower",
    brochureIndex: 12,
    title: "望高樓原址",
    ancientName: "望高樓石塔",
    modernName: "望高樓推定原址",
    coordinates: [25.186379, 121.408724],
    modernCoordinates: [25.186182, 121.407593],
    accuracy: "approximate",
    accuracyNote: "石塔已不存；位置依文化路徑、舊海岸與現有地名資料推定，現場沒有可供測量的原始基址。",
    category: "command",
    faction: "french",
    period: "battle",
    firstPhase: 8,
    summary: "望高樓為 1796 年民間捐建的石砌燈塔，法軍撤退時曾利用此處向艦隊傳遞信號。",
    detail: "望高樓位於淡水河口北側，原供船隻辨認港口。滬尾之役期間，法軍信號兵登高向海上艦隊傳達前線損失、彈藥與撤退需求；塔體其後消失。",
    strategicMeaning: "低平沙岸上的高點可同時望見外海艦隊、灘頭與內陸推進方向，是部隊與艦隊之間的重要通訊節點。",
    historicalSignificance: "望高樓把臺灣早期民建燈塔、淡水港航運與 1884 年戰場通訊連在同一處河口地景。",
    facts: ["1796 年民間捐建石砌燈塔", "位於淡水河口北側", "滬尾之役中曾用於法軍對艦信號"],
    relatedEventIds: ["retreat-signal", "retreat-to-beach"],
    imageCaption: "望高樓原址與舊沙岸",
    modernStatus: "塔體與基址均未保存，位置屬研究推定。",
    todayIntro: "塔體雖已消失，從推定位置仍可理解它與外海、沙崙灘頭及內陸戰場之間的視線關係。",
    modernPhotoUrl: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0K268470121597499543&xsmsid=0K268371586810113165",
    sources: [brochure, museumRoute, gisReport]
  },
  {
    id: "shihujiao",
    brochureIndex: 13,
    title: "石滬角先民遺址",
    ancientName: "沙崙石滬角",
    modernName: "石滬角舊地名範圍",
    coordinates: [25.186241, 121.405026],
    modernCoordinates: [25.186241, 121.405026],
    accuracy: "approximate",
    accuracyNote: "石滬角位於沙崙舊岸與潮間帶，原有石滬多已坍塌或被填築；位置以舊地名及歷史海岸範圍表示。",
    category: "heritage",
    faction: "civilian",
    period: "both",
    firstPhase: 0,
    summary: "石滬角保存沙崙居民利用礁石、潮汐捕魚的海岸技術與舊地名記憶。",
    detail: "石滬以石塊在潮間帶圍築，漲潮時魚群進入，退潮後受困其中。這片海岸在戰役發生前已是居民捕魚、通行與命名的生活空間。",
    strategicMeaning: "礁石、淺灘與潮位會限制小艇靠岸方向，但現有資料不足以把任何一座石滬視為 1884 年軍事工事。",
    historicalSignificance: "石滬角記錄滬尾河口更長期的漁業與聚落史，說明沙崙並非空白戰場，而是持續被居民使用的海岸。",
    facts: ["石滬利用漲退潮捕魚", "原有石滬多已坍塌或被填築", "位置以舊地名與潮間帶範圍表示"],
    relatedEventIds: ["landing-three-prongs"],
    imageCaption: "沙崙舊岸與石滬角潮間帶",
    modernStatus: "舊地名仍可考，完整石滬景觀已難辨認。",
    todayIntro: "現地已受填築與港區工程改變。石滬角應視為一段舊海岸文化範圍，而不是保存完整的單一構造物。",
    todayPhoto: {
      src: "/images/sites/shalun.jpg",
      alt: "今日沙崙海岸",
      caption: "石滬角所在的沙崙海岸範圍；原有石滬多已難辨。",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Shalun_Seaside_Resort"
    },
    sources: [brochure, gisReport]
  }
];

export const historicalSiteGeometries: HistoricalSiteGeometry[] = [
  {
    locationId: "shalun-landing",
    kind: "point",
    positions: [[25.190054, 121.416014]],
    labelPosition: [25.190054, 121.416014],
    note: "1884 年 10 月 8 日法軍小艇靠岸、部隊登陸與撤退所用的沙崙舊沙岸窄帶。",
    startPhase: 4,
    endPhase: 5
  },
  {
    locationId: "city-bank-remains",
    kind: "line",
    positions: [[25.189237, 121.420349], [25.189050, 121.418450], [25.188400, 121.418600], [25.187667, 121.419003], [25.186870, 121.418270], [25.186000, 121.417690], [25.185130, 121.417080], [25.184260, 121.415920], [25.183400, 121.415300], [25.182960, 121.415620], [25.182090, 121.417850], [25.181220, 121.418890], [25.180350, 121.419830], [25.179480, 121.420570], [25.178610, 121.420980], [25.177800, 121.422180]],
    labelPosition: [25.185384, 121.416456],
    note: "沙崙外城岸由北向南延伸的線位；現存殘段受道路、校地與後續工程切割。"
  },
  {
    locationId: "wanshan-memorial",
    kind: "point",
    positions: [[25.186311, 121.429611]],
    labelPosition: [25.186311, 121.429611],
    note: "萬善堂現址；堂內墓碑與遺骨曾經遷移與重新安置。"
  },
  {
    locationId: "alleged-french-cemetery",
    kind: "point",
    positions: [[25.17698, 121.438051]],
    labelPosition: [25.17698, 121.438051],
    note: "淡水外僑墓園現址；法軍集體墓地說法尚無定論。"
  },
  {
    locationId: "hobe-fort",
    kind: "point",
    positions: [[25.179379, 121.428941]],
    labelPosition: [25.179379, 121.428941],
    note: "1884 年戰後興建的滬尾礮臺現址。"
  },
  {
    locationId: "mackay-clinic",
    kind: "point",
    positions: [[25.171828, 121.438552]],
    labelPosition: [25.171828, 121.438552],
    note: "1879 年落成的滬尾偕醫館現址。"
  },
  {
    locationId: "tiansheng-battlefield",
    kind: "area",
    positions: [[25.178879, 121.422793], [25.180450, 121.422820], [25.181560, 121.423240], [25.182480, 121.425360], [25.182150, 121.425760], [25.180360, 121.425520], [25.179720, 121.425050]],
    labelPosition: [25.180850, 121.424360],
    note: "中崙、金目港仔與瓦店埤相連的主要接戰帶。",
    startPhase: 6,
    endPhase: 7
  },
  {
    locationId: "sufu-temple",
    kind: "point",
    positions: [[25.176619, 121.426692]],
    labelPosition: [25.176619, 121.426692],
    note: "油車口聚落中的蘇府王爺廟現址。"
  },
  {
    locationId: "white-battery",
    kind: "point",
    positions: [[25.177200, 121.420104]],
    labelPosition: [25.177200, 121.420104],
    note: "金目港溪口南岸、今日海巡署艦隊分署附近的白砲臺位置。"
  },
  {
    locationId: "thorn-forest",
    kind: "point",
    positions: [[25.184200, 121.423400]],
    labelPosition: [25.184200, 121.423400],
    note: "沙崙沙灘與金目港仔濕地之間的林投、黃槿阻障帶。"
  },
  {
    locationId: "old-bathing-beach",
    kind: "area",
    positions: [[25.188060, 121.409860], [25.188430, 121.412850], [25.188950, 121.414980], [25.189710, 121.416350], [25.190790, 121.417870], [25.192420, 121.419420], [25.192310, 121.419930], [25.191860, 121.420310], [25.190580, 121.419110], [25.189710, 121.418240], [25.188840, 121.417270], [25.188190, 121.416090], [25.187970, 121.415410], [25.187750, 121.414230], [25.188280, 121.413430]],
    labelPosition: [25.189425, 121.417391],
    note: "日治時期淡水海水浴場所用的沙崙海岸範圍。"
  },
  {
    locationId: "wanggao-tower",
    kind: "point",
    positions: [[25.186379, 121.408724]],
    labelPosition: [25.186379, 121.408724],
    note: "望高樓已不存；位置依河口北岸、舊海岸與文化路徑資料推定。"
  },
  {
    locationId: "shihujiao",
    kind: "area",
    positions: [[25.187019, 121.402373], [25.188296, 121.408066], [25.186295, 121.406152], [25.184719, 121.406870], [25.184336, 121.404000]],
    labelPosition: [25.186241, 121.405026],
    note: "沙崙舊岸潮間帶的石滬角地名範圍；原有石滬多已消失。"
  }
];

export const battleEvents: BattleEvent[] = [
  {
    id: "warning",
    phase: 0,
    date: "10 月 1 日",
    time: "上午",
    title: "李士卑斯艦隊抵達並發出砲擊警告",
    shortTitle: "法艦抵達",
    summary: "法國艦隊抵淡水外海，通知外僑約二十四小時後將展開砲擊。",
    detail: "港市開始疏散與懸掛中立旗幟；清軍則維持砲臺、河口阻絕與內城岸等陸上工事部署。",
    faction: "french",
    locationIds: ["mackay-clinic", "white-battery"]
  },
  {
    id: "bombardment",
    phase: 1,
    date: "10 月 2 日",
    time: "06:30 起",
    title: "法艦長時間砲擊滬尾",
    shortTitle: "艦砲轟擊",
    summary: "四艘法艦向河口舊砲臺與滬尾防區開火；地方戰役資料記載砲擊延續約十三小時、發射千餘發。",
    detail: "舊砲臺受損，砲火也波及港市。砲擊持續時間與發數在各方記載中並不完全一致。",
    faction: "french",
    locationIds: ["white-battery", "mackay-clinic"]
  },
  {
    id: "river-probe",
    phase: 2,
    date: "10 月 3 日",
    title: "小艇探測河口阻絕線",
    shortTitle: "河口試探",
    summary: "法軍以小艇偵察河口，面對沉船、填石與水雷阻絕，未能讓主力艦艇駛入。",
    detail: "法方的主要目標仍是清除航道、打開通往臺北的淡水河門戶。",
    faction: "french",
    locationIds: ["white-battery", "sufu-temple"]
  },
  {
    id: "weather-delay",
    phase: 3,
    date: "10 月 6 日",
    time: "09:00",
    title: "原定登陸受風浪影響延期",
    shortTitle: "登陸延期",
    summary: "海象不利，小艇難以安全往返艦岸，登陸行動暫緩。",
    detail: "風浪直接限制登陸時機，也說明沙崙海灘雖可接近，仍不是穩定港灣。",
    faction: "french",
    locationIds: ["shalun-landing"]
  },
  {
    id: "prelanding-bombardment",
    phase: 4,
    date: "10 月 8 日",
    time: "09:00",
    title: "艦砲轟擊沙崙、油車口掩護登陸",
    shortTitle: "登陸前砲擊",
    summary: "法艦把火力移向沙崙海岸與油車口方向，試圖壓制守軍與砲位。",
    detail: "清軍主力避免在海灘正面暴露，依托內城岸、高地與天然阻障等待法軍深入。",
    faction: "french",
    locationIds: ["shalun-landing", "white-battery"]
  },
  {
    id: "landing-three-prongs",
    phase: 5,
    date: "10 月 8 日",
    time: "約 10:00",
    title: "法軍登陸成功並分成三股推進",
    shortTitle: "三股推進",
    summary: "約六百名法軍建立灘頭，向中崙、油車口方向展開多路進攻。",
    detail: "法軍由登陸點分成北、中、南三股，分別向大庄埔、中崙與水雷營方向推進；路線依戰場关系概化。",
    faction: "french",
    locationIds: ["shalun-landing", "thorn-forest", "shihujiao"]
  },
  {
    id: "forest-melee",
    phase: 6,
    date: "10 月 8 日",
    time: "約 11:30",
    title: "法軍進入阻障林，清軍發起近距離反擊",
    shortTitle: "密林血戰",
    summary: "法軍在金針木耳林、圳溝與濕地間失去隊形，雙方在瓦店埤周邊激戰。",
    detail: "清軍以步槍、伏擊與白刃衝鋒從正面及側翼接戰；勝負是地形、指揮與部隊協同共同造成。",
    faction: "mixed",
    locationIds: ["thorn-forest", "tiansheng-battlefield"]
  },
  {
    id: "reserve-ambushed",
    phase: 7,
    date: "10 月 8 日",
    time: "11:40",
    title: "法軍預備隊增援受阻",
    shortTitle: "援軍受阻",
    summary: "灘頭預備兵力試圖接應前隊，卻在狹窄通道與伏擊壓力下難以扭轉戰局。",
    detail: "前後隊之間被地形切割，法軍無法有效重整三股部隊。",
    faction: "mixed",
    locationIds: ["thorn-forest", "shalun-landing"]
  },
  {
    id: "retreat-signal",
    phase: 8,
    date: "10 月 8 日",
    time: "11:45",
    title: "望高樓傳出撤退信號",
    shortTitle: "請求撤退",
    summary: "約 11 時 45 分，法軍信號兵登上望高樓，向艦隊傳達彈藥、損失與撤退需求。",
    detail: "望高樓位置及信號細節保留為研究推定，但它能解釋內陸部隊如何與灘頭、艦隊通訊。",
    faction: "french",
    locationIds: ["wanggao-tower"]
  },
  {
    id: "retreat-to-beach",
    phase: 9,
    date: "10 月 8 日",
    time: "約 12:00",
    title: "法軍沿原路撤向沙崙",
    shortTitle: "退回海灘",
    summary: "法軍邊打邊退，穿越泥水與林帶返回灘頭，清軍持續施壓但未追入艦砲火力圈。",
    detail: "撤退箭線與進攻方向相反，地圖同時保留清軍防線，呈現退路被壓縮的狀態。",
    faction: "mixed",
    locationIds: ["shalun-landing", "thorn-forest"]
  },
  {
    id: "boats-clear-beach",
    phase: 10,
    date: "10 月 8 日",
    time: "13:10",
    title: "小艇全數離開海灘",
    shortTitle: "陸戰結束",
    summary: "登陸部隊回到艦隊掩護下，滬尾當日陸戰告終。",
    detail: "地方戰役資料以 13 時 10 分作為小艇離岸節點；其他研究所載時間相差數十分鐘，撤退順序則大致一致。",
    faction: "french",
    locationIds: ["shalun-landing", "old-bathing-beach"]
  },
  {
    id: "blockade",
    phase: 11,
    date: "10 月 9 日後",
    title: "艦隊持續砲擊與封鎖",
    shortTitle: "長期封鎖",
    summary: "法軍未能由淡水登陸突破，但仍以艦隊封鎖台灣、限制航運與補給。",
    detail: "海上封鎖持續影響物價、節慶與居民生活；滬尾的戰爭經驗並未在 10 月 8 日下午結束。",
    faction: "french",
    locationIds: ["mackay-clinic", "sufu-temple"]
  },
  {
    id: "treaty",
    phase: 12,
    date: "1885 年 6 月 9 日",
    title: "《中法新約》簽訂，戰爭正式收束",
    shortTitle: "和約簽訂",
    summary: "法軍撤離台灣與澎湖；清廷承認法國與越南間的條約安排。",
    detail: "滬尾是清軍明確的局部戰術勝利，但整體外交結果有利法國擴張越南殖民控制。戰後台灣海防重整並走向建省。",
    faction: "mixed",
    locationIds: ["hobe-fort", "wanshan-memorial", "alleged-french-cemetery"]
  }
];

export const battleRoutes: BattleRoute[] = [
  { id: "river-probe-white-battery", title: "法軍艦艇試探油車口白砲臺", faction: "french", kind: "advance", positions: [[25.175827, 121.407037], [25.176300, 121.413800], [25.177050, 121.417600]], startPhase: 2, endPhase: 2, accuracy: "documented-area" },
  { id: "river-probe-obstruction", title: "法軍艦艇試探河口阻絕線", faction: "french", kind: "advance", positions: [[25.170723, 121.406218], [25.171400, 121.409800], [25.172350, 121.412900]], startPhase: 2, endPhase: 2, accuracy: "documented-area" },
  { id: "french-prong-north", title: "北股向大庄埔方向推進", faction: "french", kind: "advance", positions: [[25.190054, 121.416014], [25.189700, 121.417500], [25.189100, 121.419000], [25.188200, 121.421000], [25.188000, 121.422500], [25.188486, 121.424558]], startPhase: 5, endPhase: 5, accuracy: "approximate" },
  { id: "french-prong-center", title: "中股向中崙方向推進", faction: "french", kind: "advance", positions: [[25.190054, 121.416014], [25.187500, 121.416550], [25.185300, 121.417600], [25.183500, 121.419800], [25.182000, 121.422000], [25.182671, 121.423575]], startPhase: 5, endPhase: 5, accuracy: "approximate" },
  { id: "french-prong-south", title: "南股沿海岸向水雷營方向推進", faction: "french", kind: "advance", positions: [[25.190054, 121.416014], [25.187756, 121.415824], [25.185578, 121.415679], [25.183401, 121.415390], [25.182857, 121.415800], [25.182312, 121.417485], [25.181768, 121.418665], [25.180679, 121.420013], [25.179591, 121.421024], [25.178502, 121.422276], [25.177879, 121.423002]], startPhase: 5, endPhase: 5, accuracy: "approximate" },
];

export const defenseLines: DefenseLine[] = [
  {
    id: "inner-bank-line",
    title: "1884 內城岸：烏啾埔至大庄、港子平",
    positions: [[25.190710, 121.426040], [25.189840, 121.426800], [25.188960, 121.427540], [25.188090, 121.428260], [25.187220, 121.429160], [25.186350, 121.430040], [25.185480, 121.430820], [25.184610, 121.431380], [25.183740, 121.431840], [25.182860, 121.432100], [25.181990, 121.432190], [25.181120, 121.432130], [25.180250, 121.431890], [25.179470, 121.431640]],
    startPhase: 0,
    endPhase: 12,
    accuracy: "documented-area",
    note: "內城岸由油車口北側沿烏啾埔高地、大庄延伸至港子平；線位依戰場圖標定，不代表現存城岸的測量界線。"
  },
  {
    id: "river-obstruction",
    title: "河口沉船、水雷與填石阻絕線",
    positions: [[25.176350, 121.420584], [25.175655, 121.419865], [25.174503, 121.418666], [25.173460, 121.417227], [25.172547, 121.415548], [25.172438, 121.413798]],
    startPhase: 0,
    endPhase: 12,
    accuracy: "documented-area",
    note: "沉船與水雷集中在水雷營外側的河口狹窄航道；線位表示阻絕帶，不代表每艘沉船或單枚水雷的精確座標。"
  }
];

export const tacticalSymbols: TacticalSymbol[] = [
  { id: "landing", title: "法軍登陸點", kind: "landing", coordinates: [25.190054, 121.416014], faction: "french", startPhase: 4, endPhase: 5, note: "小艇接近沙崙舊沙岸、部隊開始上岸的位置。", accuracy: "verified" },
  { id: "french-base", title: "法軍灘頭集結點", kind: "french-base", coordinates: [25.188649, 121.414648], faction: "french", startPhase: 5, endPhase: 10, note: "預備隊、彈藥與登艇秩序集中於登陸範圍中央；以單一定位點表示。", accuracy: "documented-area" },
  { id: "french-north-prong-position", title: "法軍北股推進位置", kind: "french-position", coordinates: [25.188486, 121.424558], faction: "french", startPhase: 5, endPhase: 8, note: "三股推進至請求撤退期間的北股位置。", accuracy: "documented-area" },
  { id: "french-center-prong-position", title: "法軍中股推進位置", kind: "french-position", coordinates: [25.182671, 121.423575], faction: "french", startPhase: 5, endPhase: 8, note: "三股推進至請求撤退期間的中股位置。", accuracy: "documented-area" },
  { id: "french-south-prong-position", title: "法軍南股推進位置", kind: "french-position", coordinates: [25.177879, 121.423002], faction: "french", startPhase: 5, endPhase: 8, note: "三股推進至請求撤退期間的南股位置。", accuracy: "documented-area" },
  { id: "french-return-to-beach-position", title: "法軍退回海灘位置", kind: "french-position", coordinates: [25.190872, 121.419076], faction: "french", startPhase: 9, endPhase: 9, note: "法軍退回海灘階段的位置。", accuracy: "documented-area" },
  { id: "shalun-battery", title: "沙崙舊砲臺", kind: "battery", coordinates: [25.184968, 121.419092], faction: "qing", startPhase: 0, endPhase: 4, note: "沙崙防區的舊式砲位，確切位置屬推定。", accuracy: "approximate" },
  { id: "zhonglun-battery", title: "中崙舊砲臺", kind: "battery", coordinates: [25.1817, 121.4230], faction: "qing", startPhase: 0, endPhase: 4, note: "中崙方向的河口防區砲位。", accuracy: "approximate" },
  { id: "white-battery-symbol", title: "油車口白砲臺", kind: "battery", coordinates: [25.177200, 121.420104], faction: "qing", startPhase: 0, endPhase: 12, note: "金目港溪口南岸、今日海巡署艦隊分署附近。", accuracy: "documented-area" },
  { id: "wuciupu-battery", title: "烏啾埔新砲臺（1884）", kind: "battery", coordinates: [25.179577, 121.430167], faction: "qing", startPhase: 0, endPhase: 10, note: "烏啾埔高地的戰時砲位；不是戰後興建的現存滬尾礮臺。", accuracy: "documented-area" },
  { id: "mine-camp", title: "水雷營", kind: "qing-position", coordinates: [25.1764, 121.427687], faction: "qing", startPhase: 0, endPhase: 10, note: "米粉寮溪口右岸、今日忠烈祠下方一帶，負責河口水雷點火。", accuracy: "verified" },
  { id: "mine-1", title: "水雷阻絕", kind: "mine", coordinates: [25.175655, 121.419865], faction: "qing", startPhase: 0, endPhase: 12, note: "水雷配置於水雷營外側的河口狹窄航道；符號表示配置帶。", accuracy: "documented-area" },
  { id: "mine-2", title: "水雷阻絕", kind: "mine", coordinates: [25.173460, 121.417227], faction: "qing", startPhase: 0, endPhase: 12, note: "水雷配置於水雷營外側的河口狹窄航道；符號表示配置帶。", accuracy: "documented-area" },
  { id: "sunken-1", title: "沉船塞港", kind: "sunken-ship", coordinates: [25.174503, 121.418666], faction: "qing", startPhase: 0, endPhase: 12, note: "載石船沉入河口狹窄航道，與水雷共同形成阻絕。", accuracy: "documented-area" },
  { id: "sunken-2", title: "沉船塞港", kind: "sunken-ship", coordinates: [25.172547, 121.415548], faction: "qing", startPhase: 0, endPhase: 12, note: "載石沉船集中於河口阻絕帶，符號不代表單艘船的精確船位。", accuracy: "documented-area" },
  { id: "qing-north", title: "港子平、大庄守軍", kind: "qing-guard", coordinates: [25.187775, 121.427111], faction: "qing", startPhase: 5, endPhase: 9, note: "內城岸北段後方的守軍範圍。", accuracy: "documented-area" },
  { id: "qing-center", title: "烏啾埔、中崙守軍", kind: "qing-guard", coordinates: [25.183973, 121.427328], faction: "qing", startPhase: 5, endPhase: 9, note: "內城岸與高地後方的中路兵力範圍。", accuracy: "documented-area" },
  { id: "qing-south", title: "油車口守軍", kind: "qing-guard", coordinates: [25.177740, 121.425690], faction: "qing", startPhase: 5, endPhase: 9, note: "水雷營、油車口與濕地南端的守軍範圍。", accuracy: "documented-area" },
  { id: "signal", title: "望高樓撤退信號", kind: "signal", coordinates: [25.186379, 121.408724], faction: "french", startPhase: 8, endPhase: 8, note: "望高樓塔址屬推定範圍。", accuracy: "approximate" }
];

export const battleZones: BattleZone[] = [];


export const mapLabels: MapLabel[] = [
  { id: "taiwan-strait", title: "臺灣海峽", coordinates: [25.1930, 121.3940], kind: "water" },
  { id: "tamsui-river-label", title: "淡水河", coordinates: [25.1640, 121.4320], kind: "water" },
  { id: "company-field-creek-label", title: "公司田溪", coordinates: [25.1990, 121.4148], kind: "water" },
  { id: "mifenliao-creek-label", title: "米粉寮溪", coordinates: [25.1782, 121.4325], kind: "water" },
  { id: "landing-label", title: "沙崙登陸帶", coordinates: [25.1888, 121.4070], kind: "terrain" },
  { id: "gangziping", title: "港子平", coordinates: [25.1970, 121.4200], kind: "settlement" },
  { id: "dazhuangpu", title: "大庄埔", coordinates: [25.1910, 121.4290], kind: "settlement" },
  { id: "zhonglun", title: "中崙", coordinates: [25.1833, 121.4250], kind: "settlement" },
  { id: "youchekou", title: "油車口", coordinates: [25.1765, 121.4285], kind: "settlement" },
  { id: "jinmugang", title: "金目港仔濕地", coordinates: [25.1825, 121.4215], kind: "terrain" },
  { id: "wadiandai", title: "瓦店埤", coordinates: [25.1794, 121.4216], kind: "terrain" },
  { id: "wuciupu", title: "烏啾埔高地", coordinates: [25.1815, 121.4320], kind: "terrain" },
  { id: "mine-camp-label", title: "水雷營", coordinates: [25.1758, 121.4240], kind: "settlement" }
];

export const fleetPositions: Array<{ id: string; name: string; coordinates: [number, number] }> = [
  { id: "f1", name: "拉加利桑尼亞號", coordinates: [25.196726, 121.411093] },
  { id: "f2", name: "凱旋號", coordinates: [25.190519, 121.399951] },
  { id: "f3", name: "德斯丹號", coordinates: [25.181470, 121.400718] },
  { id: "f4", name: "雷諾堡號", coordinates: [25.175827, 121.407037] },
  { id: "f5", name: "巴雅號", coordinates: [25.170723, 121.406218] }
];

export const fleetBombardmentPositions: Array<[number, number]> = [
  [25.193085, 121.407648],
  [25.190310, 121.403429],
  [25.185109, 121.401896],
  [25.182439, 121.405697],
  [25.180522, 121.409556]
];

export const fleetLandingPositions: Array<[number, number]> = [
  [25.192517, 121.417143],
  [25.191401, 121.415447],
  [25.190384, 121.413751],
  [25.189761, 121.412056],
  [25.189309, 121.410360]
];

export { people } from "@/data/contentData";

export const exhibitionSources = [
  brochure,
  gisReport,
  historicalBasemapSource,
  museumBattle,
  museumRoute,
  hobeFortSource,
  sufuSource,
  bathSource,
  cemeterySource,
  wanshanSource
];
