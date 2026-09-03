import { useCallback, useRef, useState } from "react";
import type { ToastVariant } from "../components/ui/Toast";

const DEFAULT_DURATION_MS = 1600;

export function useToast() {
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<ToastVariant>("info");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (text: string, options?: { variant?: ToastVariant; duration?: number }) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      setMessage(text);
      setVariant(options?.variant ?? "info");
      setVisible(true);

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, options?.duration ?? DEFAULT_DURATION_MS);
    },
    [],
  );

  return { message, variant, visible, showToast };
}
