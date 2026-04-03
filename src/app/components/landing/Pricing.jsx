const plans = [
  {
    name: "Starter",
    price: "$00.00",
    description: "For small teams starting their knowledge journey.",
    features: ["Upload notes", "Search AI results", "3 chat/Day"],
    accent: false,
  },
  {
    name: "Growth",
    price: "Comming Soon",
    description: "For teams that need stronger context and collaboration.",
    features: ["Summaries", "Shared workspaces", "Priority support"],
    accent: true,
  },
  {
    name: "Enterprise",
    price: "Comming Soon",
    description: "For large organizations with security and scale requirements.",
    features: ["SAML + SSO", "Dedicated onboarding", "Custom SLA"],
    accent: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Pricing</p>
        <h2 className="mt-4 text-3xl font-semibold text-[color:var(--text)] sm:text-4xl">
          Simple plans for focussed teams.
        </h2>
        <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
          Choose the plan that fits your workflow, with transparent pricing and calm, predictable value.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`rounded-[2rem] border border-[rgba(102,92,85,0.12)] p-8 shadow-[0_25px_80px_rgba(44,37,33,0.08)] transition ${
              plan.accent ? "bg-[color:var(--accent)] text-[color:var(--surface-strong)]" : "bg-[color:var(--surface)] text-[color:var(--text)]"
            }`}
          >
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="mt-4 text-4xl font-semibold">{plan.price}</p>
            <p className={plan.accent ? "mt-3 text-sm leading-6 text-[color:var(--surface-strong)]" : "mt-3 text-sm leading-6 text-[color:var(--muted)]"}>
              {plan.description}
            </p>
            <ul className={plan.accent ? "mt-8 space-y-3 text-sm leading-6 text-[color:var(--surface-strong)]" : "mt-8 space-y-3 text-sm leading-6 text-[color:var(--muted)]"}>
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-2xl ${plan.accent ? "bg-[rgba(255,255,255,0.18)] text-[color:var(--surface-strong)]" : "bg-[color:var(--accent-soft)] text-[color:var(--accent)]"}`}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-5 py-3 font-semibold transition ${
                plan.accent
                  ? "bg-[color:var(--surface-strong)] text-[color:var(--accent)]"
                  : "bg-[color:var(--accent)] text-[color:var(--surface-strong)] hover:bg-[color:var(--accent-strong)]"
              }`}
            >
              {plan.accent ? "Choose Growth" : "Get started"}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
