import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export type ToastVariant = "success" | "info" | "warning";

type ToastProps = {
  message: string;
  variant?: ToastVariant;
  visible: boolean;
};

const VARIANT_STYLES: Record<ToastVariant, { bg: string; icon: string }> = {
  success: { bg: "bg-emerald-600", icon: "lucide:check-circle" },
  info: { bg: "bg-slate-900", icon: "lucide:save" },
  warning: { bg: "bg-amber-500", icon: "lucide:alert-triangle" },
};

export default function Toast({
  message,
  variant = "info",
  visible,
}: ToastProps) {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) setShouldRender(true);
  }, [visible]);

  if (!shouldRender) return null;

  const styles = VARIANT_STYLES[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      onTransitionEnd={() => {
        if (!visible) setShouldRender(false);
      }}
      className={`fixed bottom-24 left-1/2 z-[100] w-[90%] max-w-fit -translate-x-1/2 transition-all duration-300 sm:bottom-10 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div
        className={`flex items-center gap-2.5 rounded-full px-5 py-3 text-xs font-semibold text-white shadow-xl sm:text-sm ${styles.bg}`}
      >
        <Icon icon={styles.icon} className="text-lg shrink-0" />
        <span className="truncate">{message}</span>
      </div>
    </div>
  );
}
