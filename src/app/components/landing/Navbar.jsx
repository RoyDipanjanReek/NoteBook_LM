"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar({ isAdmin = false }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur-xl shadow-[0_30px_60px_rgba(15,23,42,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#hero" className="text-lg font-semibold tracking-tight text-[color:var(--text)]">
          Novo
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:var(--muted)] md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition duration-200 hover:text-[color:var(--text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <Link
              href="/admin/dashboard"
              className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-[color:var(--surface-strong)] transition hover:bg-[color:var(--accent-strong)]"
            >
              Admin Dashboard
            </Link>
          ) : null}
          {/* <Link
            href="/sign-in"
            className="rounded-full border border-[rgba(102,92,85,0.18)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] transition hover:bg-[color:var(--surface-strong)]"
          >
            Sign In
          </Link> */}
          <a
            href="/sign-in"
            className="rounded-full bg-[color:var(--accent)] px-5 py-2 text-sm font-semibold text-[color:var(--surface-strong)] shadow-[0_18px_40px_rgba(129,111,104,0.18)] transition hover:bg-[color:var(--accent-strong)]"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
