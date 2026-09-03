import { Icon } from "@iconify/react";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";

type SubmitModalProps = {
  isOpen: boolean;
  answeredCount: number;
  totalQuestions: number;
  onClose: () => void;
  onConfirm: () => void;
};

export default function SubmitModal({
  isOpen,
  answeredCount,
  totalQuestions,
  onClose,
  onConfirm,
}: SubmitModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="animate-in fade-in zoom-in w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl duration-200 sm:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
          <Icon icon="lucide:alert-triangle" className="text-2xl" />
        </div>

        <Heading level="h3" className="mb-2 text-slate-900">
          Konfirmasi Pengumpulan
        </Heading>
        <Text size="body" className="mb-2 text-slate-500">
          Kamu telah menjawab{" "}
          <span className="font-semibold text-slate-900">{answeredCount}</span>{" "}
          dari{" "}
          <span className="font-semibold text-slate-900">{totalQuestions}</span>{" "}
          soal.
        </Text>
        <Text size="small" className="mb-6 text-amber-600">
          Tindakan ini tidak bisa dibatalkan — pastikan jawabanmu sudah final.
        </Text>

        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-full border border-slate-200 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Kembali Ujian
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 cursor-pointer rounded-full bg-amber-500 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
          >
            Ya, Lihat Hasil
          </button>
        </div>
      </div>
    </div>
  );
}
