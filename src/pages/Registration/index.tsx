import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import TextField from "../../components/ui/TextField";
import Dropdown from "../../components/ui/Dropdown";
import Button from "../../components/ui/Button";

type FormData = {
  fullName: string;
  email: string;
  whatsapp: string;
  program: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const PROGRAMS = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
];

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    program: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (data: FormData): FormErrors => {
    const next: FormErrors = {};

    if (!data.fullName.trim()) {
      next.fullName = "Nama lengkap belum diisi";
    } else if (data.fullName.trim().length < 3) {
      next.fullName = "Nama terlalu pendek";
    }

    if (!data.email.trim()) {
      next.email = "Email belum diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = "Format email tidak valid";
    }

    if (!data.whatsapp.trim()) {
      next.whatsapp = "Nomor WhatsApp belum diisi";
    } else if (!/^[0-9+\s-]{9,15}$/.test(data.whatsapp)) {
      next.whatsapp = "Cek kembali format nomormu";
    }

    if (!data.program) {
      next.program = "Pilih target program dulu, ya";
    }

    return next;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectProgram = (value: string) => {
    setFormData((prev) => ({ ...prev, program: value }));
    if (errors.program) {
      setErrors((prev) => ({ ...prev, program: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    localStorage.setItem("scholars_user", JSON.stringify(formData));
    setTimeout(() => navigate("/test"), 450);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-4 md:flex-row md:items-start md:gap-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-900/5 transition-all hover:bg-slate-100 hover:text-slate-900 md:h-12 md:w-12 md:justify-center md:rounded-full md:p-0 cursor-pointer"
          title="Kembali"
        >
          <Icon
            icon="lucide:arrow-left"
            className="text-lg transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          <span className="md:hidden">Kembali</span>
        </button>

        <div className="w-full flex-1 overflow-hidden rounded-[28px] bg-white ring-1 ring-slate-900/5 grid md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative flex flex-col justify-between bg-primary p-10 text-white md:p-12">
            <span className="text-sm font-medium text-white/50">
              Formulir pendaftaran
            </span>

            <div>
              <h1 className="text-3xl font-black leading-[1.2] tracking-tight md:text-[2.5rem]">
                Ceritakan sedikit tentang dirimu sebelum memulai tes
              </h1>
            </div>
          </div>

          <div className="p-10 md:p-12">
            <span className="text-sm font-medium text-slate-400">
              Data diri
            </span>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              Isi data dirimu
            </h2>

            <form onSubmit={handleSubmit} noValidate className="mt-9 space-y-7">
              <TextField
                id="fullName"
                name="fullName"
                label="Nama lengkap"
                placeholder="Nama sesuai KTP"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
              />

              <TextField
                id="email"
                name="email"
                type="email"
                label="Alamat email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <TextField
                id="whatsapp"
                name="whatsapp"
                type="tel"
                label="No. WhatsApp"
                placeholder="0812 3456 7890"
                value={formData.whatsapp}
                onChange={handleChange}
                error={errors.whatsapp}
              />

              <Dropdown
                id="program"
                label="Target program belajar"
                placeholder="Pilih program..."
                value={formData.program}
                options={PROGRAMS}
                onChange={handleSelectProgram}
                error={errors.program}
              />

              <Button
                type="submit"
                variant="primary"
                className="mt-4 w-full"
                loading={isSubmitting}
                loadingText="Menyiapkan kuismu..."
              >
                Lanjut ke kuis
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
