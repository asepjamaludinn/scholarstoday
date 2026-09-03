import type { ProgramType } from "./quiz";

export type RecommendationLevel = {
  min: number;
  max: number;
  level: string;
  title: string;
  description: string;
  focusAreas: string[];
};

export type ProgramRecommendation = {
  program: ProgramType;
  levels: RecommendationLevel[];
};
