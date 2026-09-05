import { useEffect, useRef } from "react";

export function useLeaveGuard(
  when: boolean,
  message: string,
  onLeave: () => void,
) {
  const messageRef = useRef(message);
  const onLeaveRef = useRef(onLeave);

  useEffect(() => {
    messageRef.current = message;
    onLeaveRef.current = onLeave;
  });

  useEffect(() => {
    if (!when) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      const confirmLeave = window.confirm(messageRef.current);

      if (confirmLeave) {
        onLeaveRef.current();
      } else {
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [when]);
}
