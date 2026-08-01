export interface SiteSummary {
  id: string;
  name: string;
  shortDescription: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapPosition: {
    xPercent: number;
    yPercent: number;
  };
  tags: string[];
}

export interface QuizOption {
  id: string;
  label: string;
}

export interface SiteDetail extends SiteSummary {
  historicalContext: string;
  keyFacts: string[];
  quiz: {
    question: string;
    options: QuizOption[];
    correctOptionId: string;
    explanation: string;
  };
  nextSiteId?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  relatedSiteId?: string;
}
