import Text from "../../../components/ui/Text";
import Button from "../../../components/ui/Button";
import type { RegistrationFormData } from "../../../types/registration";

type TestHeaderProps = {
  user: RegistrationFormData | null;
  onFinish: () => void;
};

export default function TestHeader({ user, onFinish }: TestHeaderProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-sm sm:h-11 sm:w-11 sm:text-base">
          {user?.fullName?.charAt(0).toUpperCase() || "S"}
        </div>
        <div className="flex flex-col">
          <Text
            size="small"
            className="line-clamp-1 max-w-[120px] font-bold text-slate-700 sm:max-w-[200px]"
          >
            {user?.fullName || "Peserta"}
          </Text>
          <Text size="xs" className="line-clamp-1 text-slate-500">
            {user?.domisili || "Peserta Scholars Today"}
          </Text>
        </div>
      </div>

      <Button
        variant="warning"
        iconVariant="inline"
        size="xs"
        icon="lucide:check-circle"
        iconClassName="text-base sm:text-lg"
        onClick={onFinish}
        className="shrink-0 shadow-sm"
      >
        <span className="hidden sm:inline">Selesai & Kumpulkan</span>
        <span className="inline sm:hidden">Kumpulkan</span>
      </Button>
    </div>
  );
}
