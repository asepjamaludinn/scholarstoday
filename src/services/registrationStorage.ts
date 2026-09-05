import { REGISTRATION_STORAGE_KEY } from "../constants/registration";
import { clearQuizProgress } from "./quizStorage";
import { registrationSchema } from "../schemas/registration";
import type { RegistrationFormData } from "../types/registration";

export function saveRegistration(data: RegistrationFormData): boolean {
  try {
    localStorage.setItem(REGISTRATION_STORAGE_KEY, JSON.stringify(data));

    clearQuizProgress();

    return true;
  } catch (err) {
    console.warn("Gagal menyimpan data registrasi ke localStorage:", err);
    return false;
  }
}

export function getRegistration(): RegistrationFormData | null {
  try {
    const raw = localStorage.getItem(REGISTRATION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = registrationSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch (err) {
    console.warn("Gagal membaca data registrasi dari localStorage:", err);
    return null;
  }
}
