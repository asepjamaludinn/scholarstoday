import { useMemo } from "react";
import { MOCK_QUESTIONS } from "../constants/mockQuestions";
import { getRegistration } from "../services/registrationStorage";
import { getRecommendation } from "../services/recommendationService";
import { getQuizAnswers } from "../services/quizStorage";

export function useResult() {
  const registeredUser = useMemo(() => getRegistration(), []);
  const program = registeredUser?.program || "Web Development";

  const questions = useMemo(
    () => MOCK_QUESTIONS.filter((q) => q.program === program),
    [program],
  );

  const answers = useMemo(() => getQuizAnswers(), []);

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
