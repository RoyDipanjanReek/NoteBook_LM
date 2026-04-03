import { cx } from "@/lib/cx";

export default function Card({
  as: Component = "section",
  padding = "md",
  elevated = true,
  className,
  ...props
}) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <Component
      className={cx(
        "rounded-panel border border-border bg-surface",
        elevated ? "shadow-panel" : "shadow-none",
        paddingClasses[padding] || paddingClasses.md,
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cx("flex flex-col gap-2", className)} {...props} />;
}

export function CardTitle({ as: Component = "h3", className, ...props }) {
  return (
    <Component
      className={cx("font-display text-2xl tracking-[-0.04em] text-foreground", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }) {
  return <p className={cx("text-sm text-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cx("mt-6", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cx("mt-6 flex items-center justify-between gap-4", className)}
      {...props}
    />
  );
}
