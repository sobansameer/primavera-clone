
export interface Alternative {
  name: string;
  category: 'Open-Source' | 'Commercial' | 'Specialized' | string;
  keyFeatures: string[];
  pros: string[];
  cons: string[];
  howToGetStarted: string;
  website: string;
  pricing: string;
}

export interface MigrationTip {
  tip: string;
  description: string;
}

export interface AnalysisResult {
  alternatives: Alternative[];
  migrationTips: MigrationTip[];
}
