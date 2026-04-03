export default function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
      <div className="rounded-[2rem] border border-[rgba(133,116,97,0.14)] bg-[color:var(--surface)] p-8 shadow-[0_40px_120px_rgba(44,37,33,0.08)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Trusted by thoughtful teams</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
              Used by teams who prefer clarity over noise.
            </h2>
          </div>
          <div className="grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
            {['Muse', 'Arc', 'Aura', 'Verve'].map((brand) => (
              <div
                key={brand}
                className="rounded-3xl bg-[color:var(--surface-strong)] px-6 py-4 text-sm font-semibold text-[color:var(--text)] shadow-sm"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
