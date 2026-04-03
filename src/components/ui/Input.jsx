import { forwardRef, useId } from "react";
import { cx } from "@/lib/cx";

const Input = forwardRef(function Input(
  { label, hint, error, id, className, ...props },
  ref
) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const descriptionId =
    error || hint ? `${fieldId}-${error ? "error" : "hint"}` : undefined;

  return (
    <div className="space-y-2">
      {label ? (
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={fieldId}
        aria-describedby={descriptionId}
        aria-invalid={Boolean(error)}
        className={cx(
          "h-11 w-full rounded-field border bg-background px-4 text-sm text-foreground shadow-inset outline-none transition duration-200 placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/15",
          error && "border-error focus:border-error focus:ring-error/15",
          !error && "border-border",
          className
        )}
        {...props}
      />
      {error || hint ? (
        <p
          id={descriptionId}
          className={cx("text-sm", error ? "text-error" : "text-muted")}
        >
          {error || hint}
        </p>
      ) : null}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
