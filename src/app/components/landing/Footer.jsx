export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-12 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-semibold text-[color:var(--text)]">NovaNote</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[color:var(--muted)]">
            A premium knowledge platform for modern teams building intelligent workflows.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Product", links: ["Features", "Pricing", "Live demo"] },
            { label: "Company", links: ["About", "Careers", "Contact"] },
            { label: "Resources", links: ["Blog", "Support", "Security"] },
          ].map((group) => (
            <div key={group.label}>
              <p className="font-semibold text-[color:var(--text)]">{group.label}</p>
              <div className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
                {group.links.map((item) => (
                  <a key={item} href="#" className="block transition hover:text-[color:var(--text)]">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-[color:var(--border)] pt-6 text-sm text-[color:var(--muted)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NovaNote. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-[color:var(--text)]">Twitter</a>
            <a href="#" className="transition hover:text-[color:var(--text)]">LinkedIn</a>
            <a href="#" className="transition hover:text-[color:var(--text)]">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
