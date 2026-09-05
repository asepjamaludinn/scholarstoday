import { describe, it, expect, beforeEach } from "vitest";
import { isQuizComplete } from "../../services/quizCompletion";
import { saveRegistration } from "../../services/registrationStorage";
import { saveQuizAnswers } from "../../services/quizStorage";
import { MOCK_QUESTIONS } from "../../constants/mockQuestions";
import type { RegistrationFormData } from "../../types/registration";

const registrationData: RegistrationFormData = {
  fullName: "Asep Jamaludin",
  email: "asep@example.com",
  whatsapp: "081234567890",
  domisili: "Jakarta Selatan",
  program: "UI/UX Design",
};

describe("isQuizComplete", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns false when there is no registered user", () => {
    expect(isQuizComplete()).toBe(false);
  });

  it("returns false when only some questions are answered", () => {
    saveRegistration(registrationData);
    saveQuizAnswers({ 1: "A" });

    expect(isQuizComplete()).toBe(false);
  });

  it("returns true once every question for the target program is answered", () => {
    saveRegistration(registrationData);

    const programQuestions = MOCK_QUESTIONS.filter(
      (q) => q.program === registrationData.program,
    );
    const fullAnswers = Object.fromEntries(
      programQuestions.map((q) => [q.id, q.correctAnswer]),
    );
    saveQuizAnswers(fullAnswers);

    expect(isQuizComplete()).toBe(true);
  });
});
