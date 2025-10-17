import Image from "next/image";
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
      <div className="flex items-center mb-4 md:mb-0 gap-2">
        <Image
          src={"/logo2.svg"}
          alt="GenAI Logo"
          width={5}
          height={5}
          className="h-9 w-auto text-blue-500 "
        />
        <span className="font-semibold text-lg text-yellow-300">CopyBook</span>
      </div>
      <nav
        aria-label="Footer Navigation"
        className="flex space-x-6 mb-4 md:mb-0"
      >
        {footerLinks.map((link) => (
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
        &copy; {new Date().getFullYear()} GenAI. All rights reserved by Reek.
      </div>
    </div>
  </footer>
);

export default Footer;
