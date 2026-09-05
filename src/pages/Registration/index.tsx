import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import IconButton from "../../components/ui/IconButton";
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import RegistrationFormContent from "./components/RegistrationFormContent";
import Seo from "../../components/Seo";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const formState = useRegistrationForm();

  return (
    <div className="relative min-h-screen bg-primary p-4 md:p-8">
      <Seo
        title="Daftar Tes Penempatan"
        description="Isi data dirimu untuk mulai tes penempatan dan temukan kelas Scholars Today yang paling sesuai."
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[calc(100vh-2rem)] flex-col items-center justify-center py-10 md:min-h-screen">
        <div className="w-full max-w-xl">
          <IconButton
            variant="solid"
            size="md"
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            title="Kembali"
            className="mb-4 shadow-lg cursor-pointer"
          >
            <Icon icon="lucide:arrow-left" className="text-lg" />
          </IconButton>

          <RegistrationFormContent {...formState} />
        </div>
      </div>
    </div>
  );
}
