import { QUIZ_STORAGE_KEY } from "../constants/mockQuestions";
import type { AnswerKey } from "../types/quiz";

export type UserAnswers = Record<number, AnswerKey>;

const ANSWERS_KEY = QUIZ_STORAGE_KEY + "_answers";
const INDEX_KEY = QUIZ_STORAGE_KEY + "_index";

export function getQuizAnswers(): UserAnswers {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn("Gagal membaca jawaban kuis:", err);
    return {};
  }
}

export function saveQuizAnswers(answers: UserAnswers): boolean {
  try {
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    return true;
  } catch (err) {
    console.warn("Gagal menyimpan jawaban kuis:", err);
    return false;
  }
}

export function getQuizIndex(): number {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    return raw ? JSON.parse(raw) : 0;
  } catch (err) {
    console.warn("Gagal membaca indeks kuis:", err);
    return 0;
  }
}

export function saveQuizIndex(index: number): boolean {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(index));
    return true;
  } catch (err) {
    console.warn("Gagal menyimpan indeks kuis:", err);
    return false;
  }
}

export function clearQuizProgress(): void {
  try {
    localStorage.removeItem(INDEX_KEY);
    localStorage.removeItem(ANSWERS_KEY);
  } catch (err) {
    console.warn("Gagal menghapus progress kuis:", err);
  }
}
