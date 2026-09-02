import { registrationSchema } from "../schemas/registration";
import type {
  RegistrationFormData,
  RegistrationFormErrors,
} from "../types/registration";

type ValidationResult =
  | { success: true; data: RegistrationFormData }
  | { success: false; errors: RegistrationFormErrors };

export function validateRegistration(
  data: RegistrationFormData,
): ValidationResult {
  const result = registrationSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: RegistrationFormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof RegistrationFormData;
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { success: false, errors };
}
