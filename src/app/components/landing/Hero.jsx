export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(circle_at_top_left,_rgba(134,120,102,0.18),_transparent_40%)]" />
      <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-[rgba(156,141,120,0.12)] blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(102,92,85,0.14)] bg-[color:var(--surface)] px-4 py-2 text-[color:var(--muted)]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--accent)]" />
            AI-first workspace for thoughtful teams
          </div>

          <div className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-[color:var(--text)] sm:text-6xl">
              Think smarter with your data.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[color:var(--muted)]">
              An intelligent workspace that helps you ingest, explore, and summarize your documents without the noise. Stay focused on the ideas that matter.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-7 py-3 text-sm font-semibold text-[color:var(--surface-strong)] transition duration-300 hover:shadow-[0_20px_45px_rgba(129,111,104,0.18)]"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(102,92,85,0.18)] bg-[color:var(--surface)] px-7 py-3 text-sm font-semibold text-[color:var(--text)] transition duration-300 hover:bg-[color:var(--surface-strong)]"
            >
              Try Demo
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Documents", value: "24K+" },
              { label: "Insights", value: "AI driven" },
              { label: "Teams", value: "40+" },
              { label: "Focus", value: "Minimal" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-[rgba(102,92,85,0.12)] bg-[color:var(--surface)] p-4 text-center text-sm leading-6"
              >
                <p className="font-semibold text-[color:var(--text)]">{item.value}</p>
                <p className="mt-2 text-[color:var(--muted)]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -left-8 top-8 h-40 w-40 rounded-full bg-[rgba(156,141,120,0.14)] blur-3xl" />
          <div className="relative space-y-5">
            <div className="rounded-[2rem] border border-[rgba(102,92,85,0.14)] bg-[color:var(--surface)] p-6 shadow-[0_24px_70px_rgba(44,37,33,0.08)] transition duration-300 hover:-translate-y-1">
              <div className="mb-5 flex items-center justify-between text-sm text-[color:var(--muted)]">
                <span className="font-medium text-[color:var(--text)]">Notebook.ai</span>
                <span className="rounded-full bg-[rgba(156,141,120,0.12)] px-3 py-1 text-xs text-[color:var(--muted)]">Draft</span>
              </div>
              <div className="space-y-4">
                <div className="h-3 w-24 rounded-full bg-[rgba(102,92,85,0.12)]" />
                <div className="h-3 w-32 rounded-full bg-[rgba(102,92,85,0.12)]" />
                <div className="space-y-3">
                  <div className="h-3 w-full rounded-full bg-[rgba(102,92,85,0.12)]" />
                  <div className="h-3 w-11/12 rounded-full bg-[rgba(102,92,85,0.12)]" />
                  <div className="h-3 w-10/12 rounded-full bg-[rgba(102,92,85,0.12)]" />
                </div>
              </div>
            </div>

            <div className="relative rounded-[2rem] border border-[rgba(102,92,85,0.14)] bg-[color:var(--surface)] p-5 shadow-[0_20px_45px_rgba(44,37,33,0.08)] transition duration-300 hover:-translate-y-1">
              <div className="mb-4 flex items-center justify-between text-sm text-[color:var(--muted)]">
                <span>AI suggestion</span>
                <span className="rounded-full bg-[rgba(156,141,120,0.12)] px-3 py-1 text-xs">Auto</span>
              </div>
              <p className="text-sm leading-7 text-[color:var(--text)]">
                Summarize the last meeting into three key decisions and follow-up actions.
              </p>
            </div>

            <div className="relative rounded-[2rem] border border-[rgba(102,92,85,0.14)] bg-[color:var(--surface)] p-4 shadow-[0_20px_45px_rgba(44,37,33,0.08)] transition duration-300 hover:-translate-y-1">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-[color:var(--muted)]">
                <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                Recent note
              </div>
              <div className="grid gap-2 text-sm text-[color:var(--muted)]">
                <span className="h-3 w-28 rounded-full bg-[rgba(102,92,85,0.12)]" />
                <span className="h-3 w-24 rounded-full bg-[rgba(102,92,85,0.12)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
