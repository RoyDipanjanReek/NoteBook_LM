const steps = [
  {
    label: "01",
    title: "Upload your materials",
    description: "Bring PDFs, notes, and web content into a single organized workspace.",
  },
  {
    label: "02",
    title: "AI understands it",
    description: "The system reads, summarizes, and surfaces the most important ideas automatically.",
  },
  {
    label: "03",
    title: "Ask smarter questions",
    description: "Get precise, context-aware answers without leaving your workflow.",
  },
];

export default function HowItWorks() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Workflow</p>
        <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
          Move from content to clarity in three quiet steps.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {steps.map((step) => (
          <div key={step.label} className="rounded-[2rem] border border-[rgba(102,92,85,0.12)] bg-[color:var(--surface)] p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">
              {step.label}
            </div>
            <h3 className="text-xl font-semibold text-[color:var(--text)]">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
