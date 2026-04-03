"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { cx } from "@/lib/cx";

const alignClasses = {
  left: "left-0",
  right: "right-0",
};

export default function Dropdown({
  label = "Options",
  items = [],
  align = "right",
  trigger,
  className,
  menuClassName,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cx("relative inline-flex", className)}>
      {trigger ? (
        <button type="button" onClick={() => setOpen((value) => !value)}>
          {trigger}
        </button>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          aria-expanded={open}
          aria-haspopup="menu"
          onClick={() => setOpen((value) => !value)}
        >
          {label}
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className={cx(
              "h-4 w-4 transition duration-200",
              open && "rotate-180"
            )}
            aria-hidden="true"
          >
            <path
              d="M5 7.5 10 12.5 15 7.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      )}

      {open ? (
        <div
          role="menu"
          className={cx(
            "absolute top-full z-20 mt-2 min-w-52 rounded-field border border-border bg-surface p-2 shadow-lift",
            alignClasses[align] || alignClasses.right,
            menuClassName
          )}
        >
          {items.map((item) => {
            const tone =
              item.tone === "danger"
                ? "text-error hover:bg-error-soft"
                : "text-foreground hover:bg-surface-strong";

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={cx(
                    "flex w-full items-center rounded-xl px-3 py-2 text-sm transition duration-200",
                    tone
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={cx(
                  "flex w-full items-center rounded-xl px-3 py-2 text-left text-sm transition duration-200",
                  tone
                )}
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
