import { Icon } from "@iconify/react";
import Text from "../../../components/ui/Text";
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

      <button
        type="button"
        onClick={onFinish}
        className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 sm:px-5 sm:py-2.5 sm:text-sm"
      >
        <Icon icon="lucide:check-circle" className="text-base sm:text-lg" />
        <span className="hidden sm:inline">Selesai & Kumpulkan</span>
        <span className="inline sm:hidden">Kumpulkan</span>
      </button>
    </div>
  );
}
