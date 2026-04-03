"use client";

import { useEffect } from "react";
import { cx } from "@/lib/cx";

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  size = "md",
  className,
  children,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-surface-inverse/35 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cx(
          "relative z-10 w-full rounded-panel border border-border bg-surface p-6 shadow-lift",
          sizeClasses[size] || sizeClasses.md,
          className
        )}
      >
        {title || description ? (
          <div className="mb-6 space-y-2">
            {title ? (
              <h2
                id="modal-title"
                className="font-display text-3xl tracking-[-0.04em] text-foreground"
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p id="modal-description" className="text-sm text-muted">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        <div>{children}</div>
        {footer ? <div className="mt-6">{footer}</div> : null}
      </div>
    </div>
  );
}
