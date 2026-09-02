import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  RegistrationFormData,
  RegistrationFormErrors,
} from "../types/registration";
import { validateRegistration } from "../utils/validateRegistration";
import { saveRegistration } from "../services/registrationStorage";
import { REGISTRATION_REDIRECT_DELAY_MS } from "../constants/registration";

const INITIAL_FORM_DATA: RegistrationFormData = {
  fullName: "",
  email: "",
  whatsapp: "",
  program: "" as RegistrationFormData["program"],
};

export function useRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState<RegistrationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<RegistrationFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearError = (field: keyof RegistrationFormData) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name as keyof RegistrationFormData);
    if (submitError) setSubmitError(null);
  };

  const handleSelectProgram = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      program: value as RegistrationFormData["program"],
    }));
    clearError("program");
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateRegistration(formData);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      saveRegistration(result.data);

      setTimeout(() => {
        navigate("/test");
      }, REGISTRATION_REDIRECT_DELAY_MS);
    } catch (err) {
      console.error("Gagal memproses registrasi:", err);
      setSubmitError("Terjadi kesalahan. Silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleSelectProgram,
    handleSubmit,
  };
}
