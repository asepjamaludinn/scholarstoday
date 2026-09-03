export type ProgramType =
  | "Web Development"
  | "Data Science"
  | "UI/UX Design"
  | "Digital Marketing";

export type AnswerKey = "A" | "B" | "C" | "D";

export type QuestionOption = {
  key: AnswerKey;
  text: string;
};

export type Question = {
  id: number;
  question: string;
  options: QuestionOption[];
  correctAnswer: AnswerKey;
  program: ProgramType;
};
