import TextField from "../../../components/ui/TextField";
import Dropdown from "../../../components/ui/Dropdown";
import Button from "../../../components/ui/Button";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import Card from "../../../components/ui/Card";
import { REGISTRATION_PROGRAMS } from "../../../constants/registration";
import type {
  RegistrationFormData,
  RegistrationFormErrors,
} from "../../../types/registration";

interface RegistrationFormContentProps {
  formData: RegistrationFormData;
  errors: RegistrationFormErrors;
  submitError: string | null;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectProgram: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RegistrationFormContent({
  formData,
  errors,
  submitError,
  isSubmitting,
  handleChange,
  handleSelectProgram,
  handleSubmit,
}: RegistrationFormContentProps) {
  return (
    <Card variant="form" className="p-8 sm:p-10">
      <Text size="small" className="font-medium text-slate-400">
        Formulir pendaftaran
      </Text>
      <Heading level="h3" className="mt-1 text-slate-900">
        Daftar Tes Penempatan
      </Heading>
      <Text size="body" className="mt-1.5 text-slate-500">
        Isi data dirimu untuk mulai menemukan kelas yang tepat.
      </Text>

      <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            id="fullName"
            name="fullName"
            label="Nama"
            placeholder="Nama Lengkap"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
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
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
            id="domisili"
            name="domisili"
            label="Domisili"
            placeholder="Kota tempat tinggal"
            value={formData.domisili}
            onChange={handleChange}
            error={errors.domisili}
          />
        </div>

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
          className="mt-1 w-full"
          loading={isSubmitting}
          loadingText="Menyiapkan kuismu..."
        >
          Lanjut ke kuis
        </Button>
      </form>
    </Card>
  );
}
