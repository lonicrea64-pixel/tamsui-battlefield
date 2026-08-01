import { ArchiveStory, HistoricalPerson, SourceReference, WarSection } from "@/types/historical";

export const brochureSource: SourceReference = {
  label: "2004《淡水古戰場》史蹟暨導覽地圖、地圖史話",
  url: "#source-note",
  note: "收錄滬尾古戰場十三處地點、戰役進程與地方史話。"
};

export const museumBattleSource: SourceReference = {
  label: "新北市立淡水古蹟博物館：清法戰爭滬尾之役",
  url: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0K258525646375234148&xsmsid=0K255571641497878724"
};

export const museumSunSource: SourceReference = {
  label: "新北市立淡水古蹟博物館：孫開華",
  url: "https://www.tshs.ntpc.gov.tw/xmdoc/cont?sid=0K258536181597499543&xsmsid=0K255571641497878724"
};

export const gisSource: SourceReference = {
  label: "《清法戰爭滬尾之役 GIS 先期調查研究成果報告》",
  url: "https://www.tshs.ntpc.gov.tw/files/file_pool/1/0K091416262552535770/%E6%B8%85%E6%B3%95%E6%88%B0%E7%88%AD%E6%BB%AC%E5%B0%BE%E4%B9%8B%E5%BD%B9%E8%AA%BF%E6%9F%A5%E7%A0%94%E7%A9%B6%E8%A8%88%E7%95%AB%E7%AC%AC%E4%BA%8C%E6%9C%9F%EF%BC%8D%E5%9C%B0%E7%90%86%E8%B3%87%E8%A8%8A%E7%B3%BB%E7%B5%B1%28GIS%29%E5%85%88%E6%9C%9F%E8%AA%BF%E6%9F%A5%E7%A0%94%E7%A9%B6%20%E6%88%90%E6%9E%9C%E5%A0%B1%E5%91%8A%E6%9B%B8.pdf"
};

const source1884 = [brochureSource, gisSource, museumBattleSource];

export const archiveStories: ArchiveStory[] = [
  {
    id: "fleet-coming",
    chapter: "第一章",
    title: "法艦跟西仔兵來了",
    lead: "越南問題把一場東亞外交衝突推到淡水河口，滬尾居民在 1884 年秋天直接面對法國遠東艦隊。",
    paragraphs: [
      "摺頁先從越南局勢寫起：法國向北越擴張，清廷仍主張對越南的傳統宗主關係，雙方在外交與軍事上持續升高衝突。法國艦隊先在馬江擊敗福建水師，再把壓力轉向台灣北部。",
      "10 月 1 日，法國遠東艦隊副司令李士卑斯率艦抵達淡水外海，並向外國居民發出砲擊警告。淡水的領事、商人、傳教士與本地居民開始避難、懸旗辨識身分，河口城市進入戰時狀態。"
    ],
    keyFacts: ["戰爭背景是法國在越南擴張", "法艦抵達前已在馬江重創福建水師", "10 月 1 日發出砲擊警告"],
    sourceNote: "以第二張摺頁第一章為主，並用淡水古蹟博物館資料校正人名與戰爭範圍。"
  },
  {
    id: "qing-defense",
    chapter: "第二章",
    title: "清軍的防禦措施",
    lead: "淡水防禦不是三座砲臺的孤立抵抗，而是河口阻絕、城岸、密林、濕地與地方動員組成的縱深。",
    paragraphs: [
      "沙崙、中崙、油車口三座舊砲臺控制海岸與河口；清軍另以石塊填塞船隻、沉入航道，並布設水雷，目的在阻止法國軍艦沿淡水河直逼臺北。",
      "陸上可確認的核心工事，是從烏啾埔高地、今日高爾夫球場向大庄與港子平延伸的內城岸。沙崙外城岸遺構的確切建造與戰鬥時相仍有不同解讀；林投、黃槿、圳溝與金目港仔濕地則是文獻一致指向的天然阻障。"
    ],
    keyFacts: ["三座舊砲臺：沙崙、中崙、油車口", "沉船、填石與水雷封鎖河口", "內城岸、濕地與灌木構成陸上縱深"],
    sourceNote: "摺頁第二章與官方 GIS 報告相互校核；內城岸可確認，外城岸的建造時間與戰鬥時相保留研究差異。"
  },
  {
    id: "qing-tactics",
    chapter: "第三章",
    title: "清軍的戰術",
    lead: "守軍不在開闊海灘與艦砲硬碰，核心是誘敵離開海上火力，再以熟悉地形的部隊合擊。",
    paragraphs: [
      "法軍登陸時，清軍主力先隱蔽在城岸、密林與高地後方。海灘上的法軍仍能得到艦砲支援，但越過灌木與土堤後，隊形、視線和相互聯絡都受到限制。",
      "孫開華部與地方力量利用側翼道路、聚落與圳溝接近，以步槍、伏擊和近身白刃戰反攻。這不是單純的『大刀勝洋槍』故事，而是火力、地形、指揮與補給距離共同作用的結果。"
    ],
    keyFacts: ["避免在艦砲射界內決戰", "待法軍進入阻障帶後反擊", "近戰勝負建立在地形與合擊條件上"],
    sourceNote: "第二張摺頁第三章為敘事主體；用 GIS 報告避免把戰術簡化為傳奇。"
  },
  {
    id: "bombardment-story",
    chapter: "第四章",
    title: "法軍開始砲擊",
    lead: "10 月 2 日清晨，艦砲射向三座舊砲臺、河口防線與滬尾城市空間。",
    paragraphs: [
      "摺頁記錄砲擊約十三小時、發射一千餘發；官方資料確認四艘法艦自清晨開始攻擊。三座舊砲臺受重創，守軍有傷亡，砲火亦波及滬尾街與外僑區。",
      "外僑住宅與領事場所懸掛國旗辨識中立身分，英國砲艦 Cockchafer 也在附近。這些細節說明淡水並非封閉戰場，而是一座開港後與國際貿易、外交和傳教網絡相連的港市。"
    ],
    keyFacts: ["10 月 2 日 06:30 左右開始", "四艘法艦參與砲擊", "摺頁記載砲擊約十三小時、千餘發"],
    sourceNote: "砲彈總數與時長沿用摺頁記載，並以『摺頁記載』標明來源層級。"
  },
  {
    id: "landing-story",
    chapter: "第五章",
    title: "法軍登陸了",
    lead: "10 月 8 日約六百名法軍由沙崙上岸，進入灌木、圳溝與濕地交錯的地帶後，在中崙、瓦店埤一帶陷入混戰。",
    paragraphs: [
      "法軍先以艦砲轟擊海岸，再由小艇分批運送陸戰隊上岸。沙崙是相對適合舟艇靠岸的海灘，其他岸段多泥灘或礁石。部隊向內陸分進，逐步進入林投、黃槿、圳溝與低濕地構成的阻障帶。",
      "約 11 時半後，法軍在內城岸、林地與濕地障礙帶附近遭到清軍正面與側翼攻擊。11 時 45 分前後法軍傳出撤退信號，逐步退回海灘。地方戰役資料記小艇於 13 時 10 分離岸，其他研究則以約 13 時 30 分為撤退節點。"
    ],
    keyFacts: ["法軍約六百人登陸", "主要接戰帶在沙崙至中崙、瓦店埤一線", "撤退時間在不同敘事中有數十分鐘差異"],
    sourceNote: "作戰節點以兩張摺頁為優先；兵力與地形由官方 GIS、文化路徑補證。"
  },
  {
    id: "blockade-story",
    chapter: "第六章",
    title: "法軍封鎖台灣海峽",
    lead: "滬尾陸戰失敗沒有立即終止海上壓力，艦隊封鎖繼續影響航運、物價與日常生活。",
    paragraphs: [
      "法軍在 10 月下旬宣布封鎖台灣，控制重要港口外海與船舶往來。淡水雖守住登陸戰，仍長期面對海運受阻與零星砲擊的壓力。",
      "摺頁記錄貨物短缺、物價上漲二至三倍、市面蕭條與節慶物資不足。這些地方生活敘事把戰爭從軍事勝負擴展到商業、飲食、家庭與港口勞動。"
    ],
    keyFacts: ["陸戰失敗後仍持續封鎖", "船貨短缺與物價上漲", "地方社會承受長期而非一日的戰爭"],
    sourceNote: "第二張摺頁第六章提供淡水民生視角；封鎖範圍以官方戰爭概述校正。"
  },
  {
    id: "war-ending",
    chapter: "第七章",
    title: "『敗滬尾』與戰爭結束",
    lead: "『敗滬尾』是地方對法軍敗於滬尾的稱呼，也逐漸進入祭祀、墓葬與集體記憶。",
    paragraphs: [
      "居民為戰歿者收埋與祭祀，地方形成與農曆四月十八、八月二十前後相關的紀念傳統。萬善堂、湘軍墓碑、拜門口等記憶，各自有不同形成過程，不能全部視為同一制度。",
      "1885 年中法停戰交涉後，6 月 9 日《中法新約》簽訂，法軍逐步撤離並解除封鎖。滬尾之役以清軍守住淡水告終，但整場戰爭的外交結果並不等於清朝全面勝利。"
    ],
    keyFacts: ["地方稱法軍敗退為『敗滬尾』", "祭祀與墓葬保存戰爭記憶", "1885 年 6 月 9 日簽訂中法新約"],
    sourceNote: "以摺頁第七章保存地方用語，條約日期用官方史料校正。"
  },
  {
    id: "who-benefited",
    chapter: "第八章",
    title: "中法戰爭誰佔到便宜",
    lead: "淡水戰場的清軍勝利、整體戰爭的外交結果與台灣後續現代化，必須分成不同層次理解。",
    paragraphs: [
      "清軍在滬尾擊退登陸部隊，保住淡水河口；法國在越南問題上則取得外交優勢，清廷承認法國與越南之間的條約安排。局部戰術勝利沒有改變整體東亞權力變化。",
      "戰爭使清廷更重視台灣防務，劉銘傳治台期間推動行政、海防、交通與近代建設；1885 年清廷下詔台灣建省，1887 年完成行政建置。但十年後甲午戰爭的失敗，也顯示改革仍不足以扭轉帝國危機。"
    ],
    keyFacts: ["滬尾是清軍局部勝利", "法國在越南問題取得外交成果", "戰後台灣建省與防務整頓加速"],
    sourceNote: "沿用摺頁第八章的長時段提問，並區分戰術、外交與制度三個層次。"
  }
];

export const warSections: WarSection[] = [
  {
    id: "definition",
    eyebrow: "戰爭全貌",
    title: "從越南延伸至中國沿海與臺灣的戰爭",
    paragraphs: [
      "清法戰爭通常指 1883 年末至 1885 年間清朝與法國的軍事衝突。法國向北越擴張法屬印度支那勢力，清廷則維持對越南的宗主權主張與軍事影響，雙方由此走向交戰。戰區不只在越南，也包括華南沿海、福建、臺灣與澎湖。",
      "滬尾之役是臺灣戰場的重要節點，也是法國遠東戰略中的一次登陸作戰。法軍未能由淡水河口向內陸推進，但這一局部結果不能取代對整場戰爭的判斷。",
      "這場戰爭沒有正式宣戰。外交交涉、海上砲擊與陸上作戰交錯發生，戰線也隨法軍艦隊的調動而改變。滬尾所見的登陸、防禦與封鎖，正是這場跨區域戰爭的一部分。"
    ],
    facts: [
      { label: "主要時段", value: "1883 年末至 1885 年" },
      { label: "主要爭點", value: "越南控制權與法國殖民擴張" },
      { label: "戰區", value: "越南、福建、臺灣、澎湖與中國沿海" }
    ]
  },
  {
    id: "cause",
    eyebrow: "前因",
    title: "越南宗主權、北越通道與法國殖民體系",
    paragraphs: [
      "19 世紀後半，法國逐步控制越南南部，並把勢力伸向紅河航道與北越。清廷仍以傳統宗藩關係看待越南，清軍與黑旗軍等武裝力量也在北越活動。外交談判與軍事衝突交錯進行；1884 年北黎事件發生後，雙方關係迅速惡化，戰爭隨之全面升高。",
      "法國試圖運用海軍優勢迫使清廷讓步，攻擊對象包括沿海艦隊、港口與煤礦補給據點。基隆煤礦可供艦隊取得燃煤，淡水河又通往臺北，臺灣北部因此被納入法軍的作戰部署。",
      "1884 年夏季的交涉破裂後，法國艦隊將壓力施加於福建與臺灣。臺灣既能提供煤炭、港灣與補給，也是清廷海防體系中的關鍵節點；攻擊基隆與滬尾，目的不只在占領港口，也在牽制清軍並迫使清廷接受法國對越南的安排。"
    ]
  },
  {
    id: "course",
    eyebrow: "戰局",
    title: "馬江、基隆、滬尾、封鎖與澎湖",
    paragraphs: [
      "1884 年 8 月，孤拔率法軍在馬江擊潰福建水師，隨後把軍事壓力轉向臺灣。基隆進入長期陸戰與占領階段；10 月 8 日，法軍在滬尾的登陸行動遭清軍擊退。登陸失敗後，法國艦隊仍以封鎖與海上機動限制臺灣的航運和補給。",
      "1885 年 3 月，法軍攻占澎湖。與此同時，北越戰局發生變化，法國國內也出現政治危機，清法雙方因而轉向停戰談判。馬江、基隆、滬尾、臺灣封鎖與澎湖作戰彼此關聯，整體戰爭不能只用其中一場戰役的勝負概括。",
      "滬尾方面，法艦先於 10 月 2 日砲击岸防，10 月 8 日再以約六百名陸戰人員從沙崙登岸。清军依托城岸、溝渠、濕地與林投等植被阻滯法軍，法軍各路部隊難以保持聯絡，午後以前退回海灘。陸戰結束後，海上封鎖仍繼續影響臺灣。"
    ],
    facts: [
      { label: "1884.08", value: "馬江海戰，福建水師受重創" },
      { label: "1884.10.08", value: "滬尾登陸戰，法軍敗退" },
      { label: "1884–1885", value: "基隆戰事與臺灣海上封鎖" },
      { label: "1885.03", value: "法軍攻占澎湖" }
    ]
  },
  {
    id: "settlement",
    eyebrow: "結果",
    title: "滬尾守住了，越南問題則以法國取得優勢收束",
    paragraphs: [
      "1885 年春停戰後，李鴻章與法方代表在天津簽訂《中法新約》。清廷承認法國與越南締結的條約安排，並自越南撤兵；法軍則撤離臺灣與澎湖。",
      "清軍在滬尾取得明確的戰術勝利，但整體外交結果有利於法國建立對越南的殖民控制。戰役勝負與戰爭結果屬於不同層次，不能相互替代。",
      "和約使清廷退出越南事務，法國則逐步確立其在越南的殖民統治。法國未能從滬尾打開通往臺北的路線，卻仍憑藉其他戰線與外交談判取得主要目標；這也是評價清法戰爭時必須同時區分地方戰果與整體結果的原因。"
    ]
  },
  {
    id: "impact",
    eyebrow: "影響",
    title: "臺灣防務、建省與地方社會",
    paragraphs: [
      "清法戰爭暴露臺灣在海防、通訊與交通方面的不足，也顯示臺灣在東亞海權競爭中的戰略位置。清廷於 1885 年下詔臺灣建省，1887 年完成行政建置；劉銘傳任內繼續推動砲臺、電報、鐵路與行政改革。",
      "封鎖與砲擊也直接影響淡水居民。物價、航運、避難、傷患救護與墓葬祭祀，都構成戰爭經驗的一部分。今日可見的滬尾礮臺、偕醫館、城岸遺蹟與墓葬場域，分別保存了戰後海防、醫療救護、築防與地方記憶的線索。",
      "戰時海運受阻，糧食與日用品價格上升，港市商業和居民往來均受影響。偕醫館及地方醫療網絡收治傷者，陣亡清勇後來經歷遷葬與祭祀；這些痕跡說明，戰爭並不只發生在砲臺與戰線上，也進入市場、醫院、家庭與墓地。"
    ]
  },
  {
    id: "memory",
    eyebrow: "歷史意義",
    title: "從戰術選擇、戰爭代價與現存證據理解滬尾",
    paragraphs: [
      "滬尾守軍利用河口阻絕、內城岸、林地與濕地，削弱法軍登陸後的隊形與火力優勢。守軍的戰術判斷、對地方地形的掌握，以及軍民之間的運補與協作，共同影響了 10 月 8 日的戰局。戰事同時促使清廷重新檢討臺灣防務，成為戰後建設的背景之一。",
      "公共記憶不能只保留勝利敘事。砲火波及港市，封鎖改變居民生活，醫療網絡收治傷患，無名清勇經歷遷葬與祭祀；所謂法國軍人公墓的說法則仍有史料爭議。展示這些內容時，必須區分可證實的事實、根據文獻劃定的範圍與後來的傳說，避免把戰爭處理成單一、浪漫化的故事。",
      "今日踏查所見，多數並非 1884 年原物：滬尾礮臺建於戰後，舊砲臺與部分城岸已經消失，海岸也因填築改變。把文獻、舊地圖與現址並置，目的在於說明證據之間如何相互印證，而不是用現存建築替代已經消失的戰場。"
    ],
    facts: [
      { label: "應記住", value: "軍民協作、地形判斷與戰後改革" },
      { label: "不應省略", value: "傷亡、封鎖、平民生活與史料爭議" },
      { label: "展示原則", value: "可證實、推定與傳說分層呈現" }
    ]
  }
];

export const warSources: SourceReference[] = [
  brochureSource,
  museumBattleSource,
  {
    label: "國立臺灣博物館：清法戰爭與台灣",
    url: "https://www.ntm.gov.tw/News_Card_Content.aspx?dsn=146561&n=5567&sms="
  },
  {
    label: "農業部農業知識入口網：台灣建省",
    url: "https://kmweb.moa.gov.tw/subject/subject.php?id=27217"
  }
];

export const people: HistoricalPerson[] = [
  {
    id: "sun-kaihua",
    name: "孫開華",
    lifeSpan: "1840–1893",
    faction: "qing",
    campLabel: "清軍",
    role: "滬尾陸戰前線指揮",
    lead: "慈利人，湘軍將領；滬尾之役中統率前線部隊，以城岸、濕地、密林與側翼伏兵阻擊登陸法軍。",
    biography: [
      "孫開華字賡堂，湖南慈利人，出身湘軍系統。清法戰爭期間奉命駐防滬尾，負責淡水河口與陸上防線。",
      "他把擢勝中、後、右營部署在中崙、油車口、港子平等方向，並配合河口阻絕與地方地形設防。戰後因滬尾捷報獲清廷獎敘。"
    ],
    battleRole: "在法軍離開海灘與艦砲掩護後發動反擊。其戰術重點是保存兵力、利用阻障帶打亂隊形，再由正面和側翼部隊接戰。",
    legacy: "在淡水地方記憶中是守軍核心人物；人物評價應與居民、義勇和其他營官共同放回集體防禦脈絡。",
    portrait: {
      src: "/images/people/sun-kaihua.jpg",
      alt: "後世依家族資料整理的孫開華繪像",
      caption: "孫開華後世繪像；目前未見可確認的同時代照片",
      credit: "張家界地方人物資料；人物身分另依淡水古蹟博物館研究校核",
      sourceUrl: "https://www.zhangjiajieguide.com/humans-and-nature/people.html"
    },    relatedLocationIds: ["tiansheng-battlefield", "thorn-forest"],
    relatedPlaces: [
      { locationId: "tiansheng-battlefield", phase: 6, note: "孫開華在中崙、瓦店埤接戰帶統率前線反擊。" },
      { locationId: "thorn-forest", phase: 6, note: "阻障林使法軍分散，為清軍合擊創造條件。" }
    ],
    sources: [brochureSource, museumSunSource, gisSource]
  },
  {
    id: "liu-mingchuan",
    name: "劉銘傳",
    lifeSpan: "1836–1896",
    faction: "qing",
    campLabel: "清軍／台灣防務",
    role: "督辦台灣軍務大臣，後任首任台灣巡撫",
    lead: "統籌台灣防務與北台灣兵力調度；戰後主導海防重整與多項近代建設。",
    biography: [
      "劉銘傳字省三，安徽合肥人。清法戰爭爆發後奉命督辦台灣軍務，協調基隆、淡水、台北與全島防務。",
      "1885 年台灣建省後出任首任台灣巡撫，任內推動行政、財政、郵電、鐵路與海防建設。今日滬尾礮臺是戰後防務重整的代表。"
    ],
    battleRole: "負責全局調度與戰略決策，滬尾前線直接作戰則由孫開華等將領執行。把劉銘傳畫成白刃戰現場指揮並不準確。",
    legacy: "常被視為台灣近代化的重要推動者；同時也應區分戰時防務、建省制度與後來歷史敘事。",
    portrait: {
      src: "/images/people/liu-mingchuan.jpg",
      alt: "清末臺灣巡撫劉銘傳肖像",
      caption: "劉銘傳肖像，攝製年代在 1896 年以前",
      credit: "作者不詳，公版影像，Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:%E5%8A%89%E9%8A%98%E5%82%B3%E8%82%96%E5%83%8F.jpg"
    },    relatedLocationIds: ["white-battery", "hobe-fort"],
    relatedPlaces: [
      { locationId: "white-battery", phase: 2, note: "劉銘傳統籌河口阻絕與全臺防務，但不是現場砲手。" },
      { locationId: "hobe-fort", phase: 12, note: "戰後由劉銘傳推動的新式海防砲臺，呈現其防務重整。" }
    ],
    sources: [brochureSource, museumBattleSource]
  },
  {
    id: "lespes",
    name: "李士卑斯",
    originalName: "Sébastien Lespès",
    lifeSpan: "1828–1897",
    faction: "french",
    campLabel: "法國遠東艦隊",
    role: "副司令，淡水行動現場指揮",
    lead: "率艦抵達淡水，指揮 10 月 2 日砲擊與 10 月 8 日登陸行動。",
    biography: [
      "李士卑斯是法國海軍將領，清法戰爭期間任遠東艦隊副司令。淡水行動的警告、砲擊、登陸與撤退都在其現場指揮體系下進行。",
      "中文史料對其姓名有多種音譯，此處使用「李士卑斯」，並保留法文原名 Sébastien Lespès 以資辨識。"
    ],
    battleRole: "以艦砲壓制海岸後投入約六百名陸戰隊，企圖破壞淡水防禦並控制河口；部隊深入阻障地形後失去優勢而撤退。",
    legacy: "其失敗顯示海軍火力不必然能轉化為複雜地形中的陸戰成果。",
    portrait: {
      src: "/images/people/admiral-lespes.jpg",
      alt: "法國海軍將領李士卑斯1887年雕版肖像",
      caption: "李士卑斯，1887 年出版的雕版肖像",
      credit: "Charles-Lucien Huard，《La guerre du Tonkin》（1887）",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Admiral_Lespes.jpg"
    },
    relatedLocationIds: ["shalun-landing", "wanggao-tower"],
    relatedPlaces: [
      { locationId: "shalun-landing", phase: 5, note: "李士卑斯指揮沙崙登陸行動與灘頭部署。" },
      { locationId: "wanggao-tower", phase: 8, note: "撤退信號經望高樓方向傳達，是其指揮鏈的重要節點。" }
    ],
    sources: source1884
  },
  {
    id: "courbet",
    name: "孤拔",
    originalName: "Amédée Courbet",
    lifeSpan: "1827–1885",
    faction: "french",
    campLabel: "法國遠東艦隊",
    role: "總司令",
    lead: "法國遠東艦隊總司令，統籌馬江、台灣封鎖與澎湖等海上戰略；淡水現場由李士卑斯指揮。",
    biography: [
      "孤拔是清法戰爭法方最重要的海軍統帥之一，1884 年指揮馬江海戰並重創福建水師。",
      "其後法軍以基隆、台灣封鎖與澎湖為戰略支點。孤拔於 1885 年 6 月病逝澎湖，時間在和約簽訂前後。"
    ],
    battleRole: "負責整體海軍戰略與兵力運用，並非 10 月 8 日沙崙登陸部隊的前線指揮官。",
    legacy: "法國海軍以其名字紀念艦艇；台灣敘事則常以他代表法國遠東艦隊，但需與李士卑斯分工。",
    portrait: {
      src: "/images/people/amedee-courbet.jpg",
      alt: "法國遠東艦隊司令孤拔1883年肖像照",
      caption: "孤拔，Ernest Appert 攝於 1883 年",
      credit: "法國國家圖書館地理學會收藏，公版影像",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Am%C3%A9d%C3%A9e_Anatole_Prosper_Courbet_-_E._Appert_-_btv1b8450132r_(2_of_2).jpg"
    },    relatedLocationIds: ["shalun-landing"],
    relatedPlaces: [
      { locationId: "shalun-landing", phase: 11, note: "孤拔負責整體艦隊與封鎖戰略，淡水現場由李士卑斯指揮。" }
    ],
    sources: [museumBattleSource, brochureSource]
  },
  {
    id: "li-dingming",
    name: "李定明",
    faction: "qing",
    campLabel: "清軍",
    role: "擢勝中營將領",
    lead: "率部守備油車口、中崙方向，參與對法軍推進部隊的正面與側翼攻擊。",
    biography: ["李定明的個人生平資料有限，現有滬尾之役研究主要從清方奏摺與戰鬥部署辨認其前線職責。"],
    battleRole: "在油車口至中崙一帶控制守備位置，配合孫開華反擊。具體線位僅能依研究概化，不宜畫成精密行軍軌跡。",
    legacy: "提醒觀眾戰役不是少數名將單獨完成，營級軍官與部隊協同同樣關鍵。",
    portrait: {
      src: "/images/sites/tamsui-lighthouse.jpg",
      alt: "李定明所部防守的油車口與白砲臺方向今日地景",
      caption: "油車口與白砲臺方向的今日地景；非李定明本人肖像",
      credit: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/Category:Tamsui_Harbor_Lighthouse"
    },    relatedLocationIds: ["white-battery", "tiansheng-battlefield"],
    relatedPlaces: [
      { locationId: "white-battery", phase: 4, note: "油車口方向是李定明部守備與反擊關聯區。" },
      { locationId: "tiansheng-battlefield", phase: 6, note: "中崙、瓦店埤接戰帶呈現其營級協同位置。" }
    ],
    sources: [gisSource, brochureSource]
  },
  {
    id: "gong-zhanao",
    name: "龔占鰲",
    faction: "qing",
    campLabel: "清軍",
    role: "擢勝右營將領",
    lead: "清方奏報記載其部伏於假港、港子平方向，從北側與側翼反覆衝擊法軍。",
    biography: ["龔占鰲的相關資料主要保存在戰報與部署研究中，目前可考生平仍有限。"],
    battleRole: "利用大庄埔、港子平周邊道路與聚落空間接近戰場，形成法軍左翼壓力。",
    legacy: "其部署說明北側田野與聚落同樣屬於戰場，不只是海灘與密林。",
    portrait: {
      src: "/images/people/gong-context.jpg",
      alt: "龔占鰲所部活動的大庄與公司田溪方向程氏古厝",
      caption: "大庄、公司田溪方向的程氏古厝；非龔占鰲本人肖像",
      credit: "李秉樺，Wikimedia Commons，CC BY-SA 4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:%E6%B7%A1%E6%B5%B7%E6%96%B0%E5%B8%82%E9%8E%AE%E7%A8%8B%E6%B0%8F%E5%8F%A4%E5%8E%9D.jpg"
    },    relatedLocationIds: ["wanshan-memorial", "tiansheng-battlefield"],
    relatedPlaces: [
      { locationId: "wanshan-memorial", phase: 6, note: "萬善堂現址可作為大庄埔方向的定位錨點；此處不是龔占鰲的精確指揮位置。" },
      { locationId: "tiansheng-battlefield", phase: 6, note: "其部由側翼加入中崙接戰，壓迫法軍北側。" }
    ],
    sources: [gisSource, brochureSource]
  },
  {
    id: "mackay",
    name: "馬偕",
    originalName: "George Leslie Mackay",
    lifeSpan: "1844–1901",
    faction: "neutral",
    campLabel: "醫療／外僑社群",
    role: "傳教士、醫者與地方觀察者",
    lead: "長期居住淡水，建立醫療與教育事業；偕醫館的戰時救護把軍事史連到城市社會。",
    biography: [
      "加拿大長老教會傳教士馬偕於 1872 年抵達淡水，建立教會、學校與醫療據點。1879 年建成的滬尾偕醫館是今日仍可見的相關史蹟。",
      "清法戰事使淡水外僑、教會與醫療網絡直接面對砲擊、避難與傷患問題。"
    ],
    battleRole: "不是參戰者；其歷史重要性在醫療救護、外僑社會與戰時生活記錄。",
    legacy: "馬偕在北台灣醫療與教育史上影響深遠，也使淡水留下大量跨文化史料。",
    portrait: {
      src: "/images/people/george-mackay.jpg",
      alt: "馬偕牧師歷史照片",
      caption: "馬偕牧師，攝於 1902 年以前",
      credit: "作者不詳，公版影像，Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:%E9%A6%AC%E5%81%95%E7%89%A7%E5%B8%AB%E7%85%A7%E7%89%87.jpg"
    },    relatedLocationIds: ["mackay-clinic", "alleged-french-cemetery"],
    relatedPlaces: [
      { locationId: "mackay-clinic", phase: 1, note: "偕醫館代表馬偕的醫療、教會與外僑社群網絡。" },
      { locationId: "alleged-french-cemetery", phase: 12, note: "外僑墓園連結開港社群與戰後記憶，但不是已證實的法軍集體墓。" }
    ],
    sources: [brochureSource, museumBattleSource]
  },
  {
    id: "residents",
    name: "滬尾居民與地方義勇",
    faction: "civilian",
    campLabel: "地方社會",
    role: "築防、偵察、運補、救護與祭祀",
    lead: "不是戰場背景，而是修築城岸、支援守軍、照護傷者並保存戰爭記憶的集體行動者。",
    biography: [
      "官方戰報多以軍隊和將領為中心，摺頁則保留居民參與防禦、戰時生活、物價上漲與祭祀等地方視角。",
      "『居民』不是同質群體，包含商人、農漁民、義勇、婦女、教會與外僑等不同位置。"
    ],
    battleRole: "協助工事、情報、運補與救護；部分地方義勇也直接參與守備。",
    legacy: "萬善堂、拜門口與『敗滬尾』等記憶，讓戰爭持續存在於地方生活，而不只留在官方紀念碑。",
    portrait: {
      src: "/images/people/residents-context.jpg",
      alt: "馬偕與臺灣助手共同工作的歷史照片",
      caption: "馬偕與臺灣助手的歷史照片，呈現地方醫療網絡；不代表所有滬尾居民",
      credit: "公版影像，Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Teeth_extraction_by_Rev._George_Leslie_Mackay_and_his_assistants_in_Taiwan.jpg"
    },
    relatedLocationIds: ["city-bank-remains", "mackay-clinic", "wanshan-memorial"],
    relatedPlaces: [
      { locationId: "city-bank-remains", phase: 12, note: "外城岸殘段保存地方築防與後續補強的痕跡；它在 1884 年 10 月 8 日的確切狀態仍有爭議。" },
      { locationId: "mackay-clinic", phase: 1, note: "居民與外僑共同面對砲擊、避難與救護。" },
      { locationId: "wanshan-memorial", phase: 12, note: "遷葬、祭祀與萬善堂保存了戰後地方記憶。" }
    ],
    sources: [brochureSource, gisSource]
  }
];
