import { z } from "zod";

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MIN_DOMISILI_LENGTH = 3;
const MAX_DOMISILI_LENGTH = 100;

const WHATSAPP_REGEX = /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/;

export const REGISTRATION_PROGRAMS = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
] as const;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Nama lengkap belum diisi")
    .min(MIN_NAME_LENGTH, "Nama terlalu pendek")
    .max(MAX_NAME_LENGTH, "Nama terlalu panjang"),

  email: z
    .string()
    .trim()
    .min(1, "Email belum diisi")
    .max(MAX_EMAIL_LENGTH, "Email terlalu panjang")
    .email("Format email tidak valid"),

  whatsapp: z
    .string()
    .trim()
    .min(1, "Nomor WhatsApp belum diisi")
    .regex(WHATSAPP_REGEX, "Cek kembali format nomormu"),

  domisili: z
    .string()
    .trim()
    .min(1, "Domisili belum diisi")
    .min(MIN_DOMISILI_LENGTH, "Domisili terlalu pendek")
    .max(MAX_DOMISILI_LENGTH, "Domisili terlalu panjang"),

  program: z.enum(REGISTRATION_PROGRAMS, {
    message: "Pilih target program dulu, ya",
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
