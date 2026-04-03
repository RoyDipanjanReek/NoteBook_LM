"use client";

import { UserButton } from "@clerk/nextjs";
import { SignOutButton } from "@/app/components/SignOutButton";
import { Button, Card, Dropdown } from "@/components/ui";

export default function AdminTopbar() {
  const adminEmail =
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_ADMIN_USER_EMAILS ||
    "Configured in environment";

  return (
    <Card className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-eyebrow uppercase text-muted">Admin dashboard</p>
        <h1 className="mt-3 font-display text-title text-foreground">
          Platform insights
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-field border border-border bg-surface-strong px-4 py-3 text-sm text-muted">
          <span className="block text-[11px] uppercase tracking-[0.22em] text-muted">
            Admin contact
          </span>
          <span className="mt-1 block font-medium text-foreground">
            {adminEmail}
          </span>
        </div>
        <Dropdown
          label="Jump to"
          items={[
            { label: "Analytics", href: "#analytics" },
            { label: "Users", href: "#users" },
            { label: "API logs", href: "#api-usage" },
          ]}
        />
        <Button as="a" href="/home" variant="secondary" size="sm">
          View app
        </Button>
        <div className="flex items-center gap-2 rounded-pill border border-border bg-surface-strong px-3 py-2">
          <UserButton afterSignOutUrl="/" />
          <SignOutButton />
        </div>
      </div>
    </Card>
  );
}
