import { describe, it, expect, afterEach, vi } from "vitest";
import { isValidWhatsAppNumber, buildWaUrl } from "../../services/waMessage";
import type { RecommendationLevel } from "../../types/recommendation";

describe("isValidWhatsAppNumber", () => {
  it("accepts a number in international format starting with 62", () => {
    expect(isValidWhatsAppNumber("6281234567890")).toBe(true);
  });

  it("rejects a number starting with a local 0 prefix", () => {
    expect(isValidWhatsAppNumber("081234567890")).toBe(false);
  });

  it("rejects a number that is too short", () => {
    expect(isValidWhatsAppNumber("6281")).toBe(false);
  });

  it("rejects a non-numeric string", () => {
    expect(isValidWhatsAppNumber("62abcdefghi")).toBe(false);
  });
});

describe("buildWaUrl", () => {
  const recommendation: RecommendationLevel = {
    min: 50,
    max: 79,
    level: "Intermediate",
    title: "Web Development — Intermediate Track",
    description: "desc",
    focusAreas: ["React", "API"],
  };

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null when the admin number env var is not set", () => {
    vi.stubEnv("VITE_ADMIN_WHATSAPP_NUMBER", "");

    const url = buildWaUrl({
      user: null,
      program: "Web Development",
      scorePercentage: 60,
      recommendation,
    });

    expect(url).toBeNull();
  });

  it("returns null when the admin number env var has an invalid format", () => {
    vi.stubEnv("VITE_ADMIN_WHATSAPP_NUMBER", "081234567890");

    const url = buildWaUrl({
      user: null,
      program: "Web Development",
      scorePercentage: 60,
      recommendation,
    });

    expect(url).toBeNull();
  });

  it("builds a wa.me link with an encoded message when the env var is valid", () => {
    vi.stubEnv("VITE_ADMIN_WHATSAPP_NUMBER", "6281234567890");

    const url = buildWaUrl({
      user: {
        fullName: "Budi Santoso",
        email: "budi@example.com",
        whatsapp: "081234567890",
        domisili: "Jakarta",
        program: "Web Development",
      },
      program: "Web Development",
      scorePercentage: 60,
      recommendation,
    });

    expect(url).not.toBeNull();
    expect(url).toContain("https://wa.me/6281234567890?text=");

    const decoded = decodeURIComponent(url!.split("?text=")[1]);
    expect(decoded).toContain("Budi Santoso");
    expect(decoded).toContain("Jakarta");
    expect(decoded).toContain("60%");
    expect(decoded).toContain(recommendation.title);
  });

  it("falls back to default placeholder text when user data is missing", () => {
    vi.stubEnv("VITE_ADMIN_WHATSAPP_NUMBER", "6281234567890");

    const url = buildWaUrl({
      user: null,
      program: "Web Development",
      scorePercentage: 60,
      recommendation,
    });

    const decoded = decodeURIComponent(url!.split("?text=")[1]);
    expect(decoded).toContain("Peserta");
    expect(decoded).toContain("Indonesia");
  });
});
