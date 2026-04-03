export default function ProductPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Product experience</p>
          <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
            A workspace built for calm, connected discovery.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--muted)]">
            Explore knowledge, ask questions, and keep your team aligned in a subtle interface thats designed for sustained focus.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[rgba(102,92,85,0.12)] bg-[color:var(--surface)] p-8 shadow-[0_40px_80px_rgba(44,37,33,0.08)]">
          <div className="mb-8 rounded-[1.75rem] border border-[rgba(102,92,85,0.14)] bg-[color:var(--surface-strong)] p-6">
            <div className="mb-4 flex items-center justify-between text-sm text-[color:var(--muted)]">
              <span className="font-medium text-[color:var(--text)]">Workspace note</span>
              <span className="rounded-full bg-[rgba(156,141,120,0.12)] px-3 py-1 text-xs text-[color:var(--muted)]">Draft</span>
            </div>
            <div className="space-y-3">
              <div className="h-3 w-3/5 rounded-full bg-[rgba(102,92,85,0.12)]" />
              <div className="h-3 w-1/2 rounded-full bg-[rgba(102,92,85,0.12)]" />
              <div className="h-3 w-full rounded-full bg-[rgba(102,92,85,0.12)]" />
            </div>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="rounded-[1.75rem] border border-[rgba(102,92,85,0.12)] bg-[color:var(--surface)] p-5">
                <p className="text-[color:var(--muted)]">AI insight</p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text)]">Key idea: centralize your documents and let the workspace surface next steps.</p>
              </div>
              <div className="rounded-[1.75rem] border border-[rgba(102,92,85,0.12)] bg-[color:var(--surface)] p-5">
                <p className="text-[color:var(--muted)]">Smart summary</p>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text)]">Generate concise notes from lengthy conversations and research automatically.</p>
              </div>
            </div>
            <div className="hidden w-1/4 rounded-[2rem] bg-[rgba(156,141,120,0.08)] p-4 text-xs leading-6 text-[color:var(--muted)] md:block">
              <p className="font-semibold text-[color:var(--text)]">Recent</p>
              <p className="mt-3">Design brief</p>
              <p className="mt-2">Product roadmap</p>
              <p className="mt-2">Meeting notes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
