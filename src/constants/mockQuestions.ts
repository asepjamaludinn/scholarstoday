import questionsData from "../data/questions.json";
import type { ProgramType, Question } from "../types/quiz";

export type {
  Question,
  ProgramType,
  AnswerKey,
  QuestionOption,
} from "../types/quiz";

export const MOCK_QUESTIONS: Question[] = questionsData as Question[];

export const QUIZ_STORAGE_KEY = "scholars_quiz_progress";

const FALLBACK_PROGRAM: ProgramType = "Web Development";

export function getQuestionsForProgram(
  program: ProgramType | undefined,
): Question[] {
  const targetProgram = program || FALLBACK_PROGRAM;

  const filtered = MOCK_QUESTIONS.filter((q) => q.program === targetProgram);

  return filtered.length > 0
    ? filtered
    : MOCK_QUESTIONS.filter((q) => q.program === FALLBACK_PROGRAM);
}
