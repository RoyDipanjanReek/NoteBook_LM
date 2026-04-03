import Link from "next/link";
import { syncCurrentUser } from "@/lib/sync-current-user";

export default async function DashboardPage() {
  await syncCurrentUser();

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.35em] text-[color:var(--muted)]">Dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold text-[color:var(--text)]">Welcome back</h1>
          <p className="mt-3 text-[color:var(--muted)] max-w-2xl leading-7">
            This is your user dashboard. You do not have admin permissions, so you cannot access the admin control panel.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/home" className="inline-flex items-center justify-center rounded-2xl bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-[color:var(--surface-strong)] transition hover:bg-[color:var(--accent-strong)]">
              Go to Home
            </Link>
            <span className="text-sm text-[color:var(--muted)]">If you need admin access, please contact your platform administrator.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
