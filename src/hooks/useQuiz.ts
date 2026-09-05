import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { MOCK_QUESTIONS, type Question } from "../constants/mockQuestions";
import { getRegistration } from "../services/registrationStorage";
import {
  getQuizAnswers,
  getQuizIndex,
  saveQuizAnswers,
  saveQuizIndex,
  clearQuizProgress,
} from "../services/quizStorage";

export type { UserAnswers } from "../services/quizStorage";
import type { UserAnswers } from "../services/quizStorage";

type UseQuizOptions = {
  onAutoSave?: () => void;
};

export function useQuiz(options?: UseQuizOptions) {
  const { onAutoSave } = options ?? {};

  const registeredUser = useMemo(() => getRegistration(), []);
  const targetProgram = registeredUser?.program || "Web Development";

  const questions = useMemo(() => {
    const filtered = MOCK_QUESTIONS.filter((q) => q.program === targetProgram);

    return filtered.length > 0
      ? filtered
      : MOCK_QUESTIONS.filter((q) => q.program === "Web Development");
  }, [targetProgram]);

  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    getQuizIndex(),
  );

  const [answers, setAnswers] = useState<UserAnswers>(() => getQuizAnswers());

  const isFirstAnswerSave = useRef(true);

  useEffect(() => {
    saveQuizIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    saveQuizAnswers(answers);

    if (isFirstAnswerSave.current) {
      isFirstAnswerSave.current = false;
    } else {
      onAutoSave?.();
    }
  }, [answers]);

  const totalQuestions = questions.length;
  const currentQuestion: Question = questions[currentIndex] || questions[0];

  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const progressPercentage =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const isQuizComplete = answeredCount === totalQuestions && totalQuestions > 0;

  const selectAnswer = useCallback(
    (optionKey: "A" | "B" | "C" | "D") => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optionKey,
      }));
    },
    [currentQuestion.id],
  );

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentIndex(index);
      }
    },
    [totalQuestions],
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalQuestions]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const resetQuiz = useCallback(() => {
    clearQuizProgress();
    setAnswers({});
    setCurrentIndex(0);
  }, []);

  return {
    user: registeredUser,
    questions,
    targetProgram,
    currentIndex,
    currentQuestion,
    answers,
    answeredCount,
    totalQuestions,
    progressPercentage,
    isQuizComplete,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    resetQuiz,
  };
}
