import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  getQuestionsForProgram,
  type Question,
} from "../constants/mockQuestions";
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
  onAutoSaveError?: () => void;
};

export function useQuiz(options?: UseQuizOptions) {
  const { onAutoSave, onAutoSaveError } = options ?? {};

  const registeredUser = useMemo(() => getRegistration(), []);
  const targetProgram = registeredUser?.program || "Web Development";

  const questions = useMemo(
    () => getQuestionsForProgram(registeredUser?.program),
    [registeredUser?.program],
  );

  const [currentIndex, setCurrentIndex] = useState<number>(() =>
    getQuizIndex(),
  );

  const [answers, setAnswers] = useState<UserAnswers>(() => getQuizAnswers());

  const initialAnswersRef = useRef(answers);

  useEffect(() => {
    saveQuizIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const saved = saveQuizAnswers(answers);

    if (answers === initialAnswersRef.current) {
      return;
    }

    if (saved) {
      onAutoSave?.();
    } else {
      onAutoSaveError?.();
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
