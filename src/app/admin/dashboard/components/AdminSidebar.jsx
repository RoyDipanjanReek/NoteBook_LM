import { Button, Card } from "@/components/ui";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", active: true },
  { label: "Users", href: "/admin/dashboard#users" },
  { label: "Analytics", href: "/admin/dashboard#analytics" },
  { label: "Settings", href: "/admin/dashboard#settings" },
];

export default function AdminSidebar() {
  return (
    <Card as="aside" className="hidden w-72 flex-col gap-6 xl:flex h-screen">
      <div>
        <p className="text-eyebrow uppercase text-muted">Admin panel</p>
        <h2 className="mt-4 font-display text-title text-foreground">
          Control center
        </h2>
      </div>
      <div className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            as="a"
            href={item.href}
            fullWidth
            size="md"
            variant={item.active ? "primary" : "ghost"}
            className="justify-start rounded-field"
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="mt-auto rounded-panel border border-border bg-surface-strong p-5 text-sm text-muted">
        <p className="font-semibold text-foreground">Admin access</p>
        <p className="mt-2">Only users with the admin role can reach this dashboard.</p>
      </div>
    </Card>
  );
}
