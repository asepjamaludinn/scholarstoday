import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import Button from "../../../components/ui/Button";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    triggerElementRef.current = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements =
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      triggerElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-modal-title"
        aria-describedby="submit-modal-description"
        className="animate-in fade-in zoom-in w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl duration-200 sm:p-8"
      >
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600"
          aria-hidden="true"
        >
          <Icon icon="lucide:alert-triangle" className="text-2xl" />
        </div>

        <Heading
          id="submit-modal-title"
          level="h3"
          className="mb-2 text-slate-900"
        >
          Konfirmasi Pengumpulan
        </Heading>
        <Text
          id="submit-modal-description"
          size="body"
          className="mb-2 text-slate-500"
        >
          Kamu telah menjawab{" "}
          <span className="font-semibold text-slate-900">{answeredCount}</span>{" "}
          dari{" "}
          <span className="font-semibold text-slate-900">{totalQuestions}</span>{" "}
          soal.
        </Text>
        <Text size="small" className="mb-6 text-amber-600">
          Tindakan ini tidak bisa dibatalkan, pastikan jawabanmu sudah final.
        </Text>

        <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center">
          <Button
            ref={closeButtonRef}
            variant="outline"
            iconVariant="none"
            onClick={onClose}
            className="flex-1 text-slate-700"
          >
            Kembali Ujian
          </Button>
          <Button
            variant="warning"
            iconVariant="none"
            onClick={onConfirm}
            className="flex-1 shadow-sm"
          >
            Ya, Lihat Hasil
          </Button>
        </div>
      </div>
    </div>
  );
}
