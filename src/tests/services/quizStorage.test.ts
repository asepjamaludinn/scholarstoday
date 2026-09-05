import { describe, it, expect, beforeEach } from "vitest";
import {
  getQuizAnswers,
  saveQuizAnswers,
  getQuizIndex,
  saveQuizIndex,
  clearQuizProgress,
} from "../../services/quizStorage";
import { QUIZ_STORAGE_KEY } from "../../constants/mockQuestions";

describe("quizStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns an empty answers object when nothing has been saved yet", () => {
    expect(getQuizAnswers()).toEqual({});
  });

  it("returns 0 as the default question index", () => {
    expect(getQuizIndex()).toBe(0);
  });

  it("persists and retrieves answers", () => {
    saveQuizAnswers({ 1: "A", 2: "C" });

    expect(getQuizAnswers()).toEqual({ 1: "A", 2: "C" });
  });

  it("persists and retrieves the current question index", () => {
    saveQuizIndex(4);

    expect(getQuizIndex()).toBe(4);
  });

  it("clears both answers and index from storage", () => {
    saveQuizAnswers({ 1: "A" });
    saveQuizIndex(3);

    clearQuizProgress();

    expect(getQuizAnswers()).toEqual({});
    expect(getQuizIndex()).toBe(0);
  });

  it("falls back to defaults when stored data is corrupted", () => {
    localStorage.setItem(`${QUIZ_STORAGE_KEY}_answers`, "not-valid-json");
    localStorage.setItem(`${QUIZ_STORAGE_KEY}_index`, "not-valid-json");

    expect(getQuizAnswers()).toEqual({});
    expect(getQuizIndex()).toBe(0);
  });
});
