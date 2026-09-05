import { getQuestionsForProgram } from "../constants/mockQuestions";
import { getRegistration } from "./registrationStorage";
import { getQuizAnswers } from "./quizStorage";

export function isQuizComplete(): boolean {
  const user = getRegistration();
  const targetQuestions = getQuestionsForProgram(user?.program);

  if (targetQuestions.length === 0) return false;

  const answers = getQuizAnswers();
  const answeredCount = targetQuestions.filter((q) => answers[q.id]).length;

  return answeredCount === targetQuestions.length;
}
