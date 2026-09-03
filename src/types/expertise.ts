import type { ProgramType } from "./quiz";

export type ExpertiseItem = {
  program: ProgramType;
  image: string;
  description: string;
  skills: string[];
};
