import { Card } from "@/components/ui";

const accentClasses = {
  purple: "bg-primary-soft text-primary",
  emerald: "bg-success-soft text-success",
  amber: "bg-primary-soft text-primary",
  violet: "bg-primary-soft text-primary",
};

export default function OverviewCard({ label, value, subtitle, accent }) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          {label}
        </p>
        <span
          className={`rounded-pill px-3 py-1 text-xs font-semibold ${
            accentClasses[accent] || "bg-surface-strong text-foreground"
          }`}
        >
          {subtitle}
        </span>
      </div>
      <p className="mt-6 font-display text-4xl tracking-[-0.05em] text-foreground">
        {value}
      </p>
    </Card>
  );
}
