import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import TextField from "../../components/ui/TextField";
import Dropdown from "../../components/ui/Dropdown";
import Button from "../../components/ui/Button";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { REGISTRATION_PROGRAMS } from "../../constants/registration";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleSelectProgram,
    handleSubmit,
  } = useRegistrationForm();

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
                options={[...REGISTRATION_PROGRAMS]}
                onChange={handleSelectProgram}
                error={errors.program}
              />

              {submitError && (
                <p role="alert" className="text-sm font-medium text-red-500">
                  {submitError}
                </p>
              )}

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
