import { describe, it, expect } from "vitest";
import { getRecommendation } from "../../services/recommendationService";
import type { ProgramType } from "../../types/quiz";

describe("getRecommendation", () => {
  it("returns the Advanced track for scores from 80 to 100", () => {
    const result = getRecommendation("Web Development", 85);

    expect(result?.level).toBe("Advanced");
    expect(result?.title).toBe("Web Development — Advanced Track");
  });

  it("returns the Intermediate track for scores from 50 to 79", () => {
    const result = getRecommendation("Data Science", 60);

    expect(result?.level).toBe("Intermediate");
  });

  it("returns the Beginner track for scores from 0 to 49", () => {
    const result = getRecommendation("UI/UX Design", 20);

    expect(result?.level).toBe("Beginner");
  });

  it("treats the score 100 as Advanced (upper bound inclusive)", () => {
    const result = getRecommendation("Digital Marketing", 100);

    expect(result?.level).toBe("Advanced");
  });

  it("treats the score 0 as Beginner (lower bound inclusive)", () => {
    const result = getRecommendation("Web Development", 0);

    expect(result?.level).toBe("Beginner");
  });

  it("clamps scores above 100 down to 100 before matching a level", () => {
    const result = getRecommendation("Web Development", 150);

    expect(result?.level).toBe("Advanced");
  });

  it("clamps negative scores up to 0 before matching a level", () => {
    const result = getRecommendation("Web Development", -20);

    expect(result?.level).toBe("Beginner");
  });

  it("returns null when the program has no matching recommendation data", () => {
    const result = getRecommendation("Nonexistent Program" as ProgramType, 50);

    expect(result).toBeNull();
  });
});
