const faqs = [
  {
    question: "What content formats does NovaNote support?",
    answer: "Upload PDFs, CSVs, markdown, text snippets, and pull content directly from websites for instant indexing.",
  },
  {
    question: "Can I search across private documents securely?",
    answer: "Yes. Your data is stored securely and searchable in a controlled workspace with role-based access.",
  },
  {
    question: "How fast can my team start using it?",
    answer: "Most teams are productive within minutes thanks to automated ingestion and intelligent search setup.",
  },
  {
    question: "Does NovaNote integrate with existing tools?",
    answer: "Planned integrations include Slack, Notion, and major file storage services for seamless workflows.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">FAQ</p>
        <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
          Questions teams ask before launch.
        </h2>
      </div>

      <div className="mt-12 space-y-4">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 transition hover:border-blue-300/60"
          >
            <summary className="cursor-pointer text-lg font-semibold text-[color:var(--text)]">
              {item.question}
            </summary>
            <p className="mt-4 text-[color:var(--muted)] leading-7">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
