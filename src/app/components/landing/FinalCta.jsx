export default function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="rounded-[2rem] border border-[rgba(102,92,85,0.12)] bg-[color:var(--surface)] p-12 text-center shadow-[0_40px_120px_rgba(44,37,33,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Ready to begin?</p>
        <h2 className="mt-4 text-4xl font-semibold text-[color:var(--text)] sm:text-5xl">
          Build a calmer way to work with your data.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
          Start using a knowledge workspace that helps you think, decide, and move forward with clarity.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--accent)] px-7 py-3 text-sm font-semibold text-[color:var(--surface-strong)] shadow-[0_18px_40px_rgba(129,111,104,0.18)] transition hover:bg-[color:var(--accent-strong)]"
          >
            Start free trial
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-full border border-[rgba(102,92,85,0.14)] bg-[color:var(--surface)] px-7 py-3 text-sm font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--surface-strong)]"
          >
            Explore features
          </a>
        </div>
      </div>
    </section>
  );
}
