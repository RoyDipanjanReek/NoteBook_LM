import { cx } from "@/lib/cx";

const variantClasses = {
  primary:
    "bg-primary text-primary-contrast shadow-panel hover:bg-primary-strong focus-visible:ring-primary/20",
  secondary:
    "border border-border bg-surface text-foreground shadow-panel hover:bg-surface-strong focus-visible:ring-primary/15",
  ghost:
    "bg-transparent text-muted hover:bg-surface-strong hover:text-foreground focus-visible:ring-primary/15",
};

const sizeClasses = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
} = {}) {
  return cx(
    "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    fullWidth && "w-full",
    className
  );
}

export default function Button({
  as: Component = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  type,
  ...props
}) {
  const buttonProps =
    Component === "button" ? { type: type ?? "button" } : {};

  return (
    <Component
      className={buttonVariants({ variant, size, fullWidth, className })}
      {...buttonProps}
      {...props}
    />
  );
}
