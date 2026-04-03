const features = [
  {
    title: "AI insights",
    description: "Understand the meaning behind every document with a workspace that surfaces the right answer.",
    icon: "🧠",
  },
  {
    title: "Document intelligence",
    description: "Capture and browse notes, PDFs, and websites in one calm environment.",
    icon: "📄",
  },
  {
    title: "Summarization",
    description: "Get concise summaries that keep your team aligned without extra work.",
    icon: "✍️",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Capabilities</p>
        <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
          The intelligence your notes have been waiting for.
        </h2>
        <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
          A quiet workspace that helps you find answers, capture decisions, and move from data to insight with fewer distractions.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-[2rem] border border-[rgba(102,92,85,0.12)] bg-[color:var(--surface)] p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[color:var(--accent-soft)] text-lg">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-[color:var(--text)]">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
