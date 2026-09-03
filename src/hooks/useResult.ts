import { useMemo } from "react";
import { MOCK_QUESTIONS, QUIZ_STORAGE_KEY } from "../constants/mockQuestions";
import type { UserAnswers } from "./useQuiz";
import { getRegistration } from "../services/registrationStorage";
import { getRecommendation } from "../services/recommendationService";

function readStoredAnswers(): UserAnswers {
  try {
    const saved = localStorage.getItem(QUIZ_STORAGE_KEY + "_answers");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function useResult() {
  const registeredUser = useMemo(() => getRegistration(), []);
  const program = registeredUser?.program || "Web Development";

  const questions = useMemo(
    () => MOCK_QUESTIONS.filter((q) => q.program === program),
    [program],
  );

  const answers = useMemo(() => readStoredAnswers(), []);

  const { correctCount, totalQuestions, scorePercentage } = useMemo(() => {
    const total = questions.length;
    const correct = questions.reduce((count, q) => {
      return answers[q.id] === q.correctAnswer ? count + 1 : count;
    }, 0);
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      correctCount: correct,
      totalQuestions: total,
      scorePercentage: percentage,
    };
  }, [questions, answers]);

  const recommendation = useMemo(
    () => getRecommendation(program, scorePercentage),
    [program, scorePercentage],
  );

  return {
    user: registeredUser,
    program,
    correctCount,
    totalQuestions,
    scorePercentage,
    recommendation,
  };
}
