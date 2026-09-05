import { describe, it, expect } from "vitest";
import { validateRegistration } from "../../utils/validateRegistration";
import type { RegistrationFormData } from "../../types/registration";

const validData: RegistrationFormData = {
  fullName: "Budi Santoso",
  email: "budi@example.com",
  whatsapp: "081234567890",
  domisili: "Jakarta Selatan",
  program: "Web Development",
};

describe("validateRegistration", () => {
  it("returns success for valid data", () => {
    const result = validateRegistration(validData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fullName).toBe("Budi Santoso");
    }
  });

  it("rejects an empty fullName", () => {
    const result = validateRegistration({ ...validData, fullName: "" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.fullName).toBe("Nama lengkap belum diisi");
    }
  });

  it("rejects a fullName shorter than 3 characters", () => {
    const result = validateRegistration({ ...validData, fullName: "Al" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.fullName).toBe("Nama terlalu pendek");
    }
  });

  it("rejects an invalid email format", () => {
    const result = validateRegistration({
      ...validData,
      email: "not-an-email",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.email).toBe("Format email tidak valid");
    }
  });

  it("rejects a WhatsApp number with invalid format", () => {
    const result = validateRegistration({ ...validData, whatsapp: "12345" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.whatsapp).toBe("Cek kembali format nomormu");
    }
  });

  it("accepts WhatsApp numbers with +62 and 62 prefixes", () => {
    expect(
      validateRegistration({ ...validData, whatsapp: "+6281234567890" })
        .success,
    ).toBe(true);
    expect(
      validateRegistration({ ...validData, whatsapp: "6281234567890" }).success,
    ).toBe(true);
  });

  it("rejects a domisili shorter than 3 characters", () => {
    const result = validateRegistration({ ...validData, domisili: "JK" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.domisili).toBe("Domisili terlalu pendek");
    }
  });

  it("rejects an empty or invalid program selection", () => {
    const result = validateRegistration({
      ...validData,
      program: "" as RegistrationFormData["program"],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.program).toBe("Pilih target program dulu, ya");
    }
  });

  it("collects errors for multiple invalid fields at once", () => {
    const result = validateRegistration({
      fullName: "",
      email: "invalid",
      whatsapp: "123",
      domisili: "",
      program: "" as RegistrationFormData["program"],
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(Object.keys(result.errors)).toEqual(
        expect.arrayContaining([
          "fullName",
          "email",
          "whatsapp",
          "domisili",
          "program",
        ]),
      );
    }
  });
});
