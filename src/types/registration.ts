import type { RegistrationFormData } from "../schemas/registration";

export type { RegistrationFormData };

export type RegistrationFormErrors = Partial<
  Record<keyof RegistrationFormData, string>
>;
