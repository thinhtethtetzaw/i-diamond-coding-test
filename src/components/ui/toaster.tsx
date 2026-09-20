"use client";

import { useEffect } from "react";
import { useUiStore, type Toast } from "@/store/use-ui-store";

const DURATION_MS = 5000;

function ToastItem({ toast }: { toast: Toast }) {
  const dismissToast = useUiStore((state) => state.dismissToast);

  useEffect(() => {
    const timer = window.setTimeout(() => dismissToast(toast.id), DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [dismissToast, toast.id]);

  return (
    <div className={`toast toast--${toast.type}`} role={toast.type === "error" ? "alert" : "status"}>
      <span className="toast__icon" aria-hidden="true">{toast.type === "success" ? "✓" : "!"}</span>
      <div className="toast__body">
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>
      </div>
      <button type="button" className="toast__close" aria-label="Dismiss notification" onClick={() => dismissToast(toast.id)}>×</button>
      <i className="toast__bar" style={{ animationDuration: `${DURATION_MS}ms` }} />
    </div>
  );
}

export function Toaster() {
  const toasts = useUiStore((state) => state.toasts);
  return (
    <div className="toaster" aria-live="polite">
      {toasts.map((toast) => <ToastItem key={toast.id} toast={toast} />)}
    </div>
  );
}
