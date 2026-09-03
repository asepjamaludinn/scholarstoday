import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  MOCK_QUESTIONS,
  QUIZ_STORAGE_KEY,
  type Question,
} from "../constants/mockQuestions";
import { getRegistration } from "../services/registrationStorage";

export type UserAnswers = Record<number, "A" | "B" | "C" | "D">;

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

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(QUIZ_STORAGE_KEY + "_index");
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [answers, setAnswers] = useState<UserAnswers>(() => {
    try {
      const saved = localStorage.getItem(QUIZ_STORAGE_KEY + "_answers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const isFirstAnswerSave = useRef(true);

  useEffect(() => {
    try {
      localStorage.setItem(
        QUIZ_STORAGE_KEY + "_index",
        JSON.stringify(currentIndex),
      );
    } catch (err) {
      console.warn("Gagal menyimpan indeks kuis:", err);
    }
  }, [currentIndex]);

  useEffect(() => {
    try {
      localStorage.setItem(
        QUIZ_STORAGE_KEY + "_answers",
        JSON.stringify(answers),
      );

      if (isFirstAnswerSave.current) {
        isFirstAnswerSave.current = false;
      } else {
        onAutoSave?.();
      }
    } catch (err) {
      console.warn("Gagal menyimpan jawaban kuis:", err);
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
    localStorage.removeItem(QUIZ_STORAGE_KEY + "_index");
    localStorage.removeItem(QUIZ_STORAGE_KEY + "_answers");
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
