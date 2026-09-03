import recommendationsData from "../data/classRecommendations.json";
import type {
  ProgramRecommendation,
  RecommendationLevel,
} from "../types/recommendation";
import type { ProgramType } from "../types/quiz";

const RECOMMENDATIONS = recommendationsData as ProgramRecommendation[];

export function getRecommendation(
  program: ProgramType,
  scorePercentage: number,
): RecommendationLevel | null {
  const programData = RECOMMENDATIONS.find((item) => item.program === program);
  if (!programData) return null;

  const clampedScore = Math.min(100, Math.max(0, scorePercentage));

  return (
    programData.levels.find(
      (level) => clampedScore >= level.min && clampedScore <= level.max,
    ) ?? null
  );
}
