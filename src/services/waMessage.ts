import type { RegistrationFormData } from "../types/registration";
import type { RecommendationLevel } from "../types/recommendation";

const WA_NUMBER_REGEX = /^62[1-9][0-9]{7,13}$/;

export function isValidWhatsAppNumber(number: string): boolean {
  return WA_NUMBER_REGEX.test(number);
}

type BuildWaUrlParams = {
  user: RegistrationFormData | null;
  program: string;
  scorePercentage: number;
  recommendation: RecommendationLevel | null;
};

export function buildWaUrl({
  user,
  program,
  scorePercentage,
  recommendation,
}: BuildWaUrlParams): string | null {
  const adminWhatsAppNumber = import.meta.env.VITE_ADMIN_WHATSAPP_NUMBER ?? "";

  if (!adminWhatsAppNumber) {
    console.warn(
      "VITE_ADMIN_WHATSAPP_NUMBER belum diset di file .env — lihat .env.example.",
    );
    return null;
  }

  if (!isValidWhatsAppNumber(adminWhatsAppNumber)) {
    console.warn(
      "VITE_ADMIN_WHATSAPP_NUMBER di .env formatnya tidak valid (harus diawali 62, tanpa +/0/spasi).",
    );
    return null;
  }

  const fullName = user?.fullName?.trim() || "Peserta";
  const domisili = user?.domisili?.trim() || "Indonesia";
  const recommendationTitle = recommendation?.title || "Program Terkait";

  const wave = String.fromCodePoint(0x1f44b);
  const trophy = String.fromCodePoint(0x1f3c6);
  const sparkles = String.fromCodePoint(0x2728);

  const message = `Halo admin Scholars Today! ${wave}

Perkenalkan, saya *${fullName}* dari *${domisili}*.

Saya baru saja menyelesaikan Placement Test untuk program *${program}* dan mendapatkan skor *${scorePercentage}%*.

Berdasarkan hasil tes, saya direkomendasikan untuk mengambil kelas:
${trophy} *${recommendationTitle}*

Saya ingin berkonsultasi dan mendaftar untuk kelas ini. Mohon info lebih lanjut ya. Terima kasih! ${sparkles}`;

  return `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(message)}`;
}
