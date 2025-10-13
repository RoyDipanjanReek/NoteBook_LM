'use client'
import React, { useState } from "react";

const navLinks = [
  { name: "Products", href: "#" },
  { name: "Features", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Support", href: "#" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-4 bg-black sm:py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center" aria-label="GenAI Home">
          <img
            src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg"
            alt="GenAI Logo"
            className="h-9 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex ml-10 space-x-10" aria-label="Main Navigation">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="text-base text-gray-400 hover:text-white transition"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:inline-flex relative group">
          <div className="absolute -inset-px rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
          <a
            href="#"
            className="relative inline-flex items-center px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
            role="button"
          >
            Start free trial
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden px-4 pt-4 pb-6 space-y-4 bg-black" aria-label="Mobile Navigation">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              className="block text-base text-gray-400 hover:text-white transition"
            >
              {link.name}
            </a>
          ))}
          <div className="relative group mt-4">
            <div className="absolute -inset-px rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
            <a
              href="#"
              className="relative inline-flex items-center w-full px-6 py-2 text-base font-normal text-white bg-black border border-transparent rounded-full"
              role="button"
            >
              Start free trial
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;