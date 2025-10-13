import React from "react";

const footerLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
  { name: "Privacy", href: "#" },
];

const Footer = () => (
  <footer className="bg-black text-gray-400 py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src="https://landingfoliocom.imgix.net/store/collection/dusk/images/logo.svg"
          alt="GenAI Logo"
          className="h-8 w-auto mr-2"
        />
        <span className="text-white font-semibold text-lg">GenAI</span>
      </div>
      <nav aria-label="Footer Navigation" className="flex space-x-6 mb-4 md:mb-0">
        {footerLinks.map(link => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-white transition"
          >
            {link.name}
          </a>
        ))}
      </nav>
      <div className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GenAI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;