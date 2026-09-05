import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { getRegistration } from "../services/registrationStorage";
import { isQuizComplete } from "../services/quizCompletion";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Text from "./ui/Text";
import Card from "./ui/Card";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAnswers?: boolean;
};

export default function ProtectedRoute({
  children,
  requireAnswers = false,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const user = getRegistration();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
        <Card
          variant="subtle"
          className="flex w-full max-w-md flex-col items-center p-8 text-center shadow-lg sm:p-10"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 ring-4 ring-red-50/50">
            <Icon icon="lucide:user-x" className="text-3xl" />
          </div>

          <Heading level="h3" className="mb-2 text-slate-900">
            Sesi Berakhir
          </Heading>

          <Text size="body" className="mb-7 text-slate-500">
            Data registrasimu tidak ditemukan atau sesi telah berakhir. Silakan
            lakukan pendaftaran kembali untuk melanjutkan.
          </Text>

          <Button
            variant="primary"
            onClick={() => navigate("/register", { replace: true })}
            icon="lucide:clipboard-edit"
            className="w-full justify-center"
          >
            Silakan Registrasi Ulang
          </Button>
        </Card>
      </div>
    );
  }

  if (requireAnswers && !isQuizComplete()) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
        <Card
          variant="subtle"
          className="flex w-full max-w-md flex-col items-center p-8 text-center shadow-lg sm:p-10"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-500 ring-4 ring-amber-50/50">
            <Icon icon="lucide:alert-circle" className="text-3xl" />
          </div>

          <Heading level="h3" className="mb-2 text-slate-900">
            Kuis Belum Selesai
          </Heading>

          <Text size="body" className="mb-7 text-slate-500">
            Kamu belum menyelesaikan semua pertanyaan kuis atau datamu terhapus.
            Harap lengkapi semua jawaban untuk melihat hasil.
          </Text>

          <Button
            variant="warning"
            onClick={() => navigate("/test", { replace: true })}
            icon="lucide:arrow-right"
            className="w-full justify-center"
          >
            Lanjutkan Kuis
          </Button>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
