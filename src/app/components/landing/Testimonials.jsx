const testimonials = [
  {
    quote: "NovaNote turned our knowledge process into a single source of truth. Searching across docs has never been easier.",
    author: "Sara Patel",
    role: "Head of Operations, AtlasLabs",
  },
  {
    quote: "The AI search results are surprisingly calm and consistently accurate, which made our team faster.",
    author: "Marcus Lee",
    role: "Product Lead, Allied",
  },
  {
    quote: "We now keep every customer conversation and roadmap note in one clear place, without clutter.",
    author: "Elena Ruiz",
    role: "Growth Manager, Cove",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Testimonials</p>
        <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
          What teams say about the workspace.
        </h2>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.author}
            className="rounded-[2rem] border border-[rgba(102,92,85,0.12)] bg-[color:var(--surface)] p-8 shadow-[0_25px_80px_rgba(44,37,33,0.08)]"
          >
            <p className="text-lg leading-8 text-[color:var(--text)]">“{item.quote}”</p>
            <div className="mt-8">
              <p className="font-semibold text-[color:var(--text)]">{item.author}</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
