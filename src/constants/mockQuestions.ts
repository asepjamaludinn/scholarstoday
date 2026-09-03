import questionsData from "../data/questions.json";
import type { Question } from "../types/quiz";

export type {
  Question,
  ProgramType,
  AnswerKey,
  QuestionOption,
} from "../types/quiz";

export const MOCK_QUESTIONS: Question[] = questionsData as Question[];

export const QUIZ_STORAGE_KEY = "scholars_quiz_progress";
