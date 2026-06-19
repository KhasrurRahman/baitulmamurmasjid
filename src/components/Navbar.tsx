"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const links = [
  { href: "/", label: "হোম" },
  { href: "/about", label: "মসজিদ সম্পর্কে" },
  { href: "/fund", label: "ফান্ড ডিটেইলস" },
  { href: "/gallery", label: "গ্যালারি" },
  { href: "/documents", label: "ডকুমেন্টস" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt={siteConfig.nameEn}
            width={40}
            height={40}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />
          <span className="text-base font-semibold text-emerald-800 sm:text-lg">
            {siteConfig.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-emerald-900 transition hover:bg-emerald-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="মেনু খুলুন/বন্ধ করুন"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full text-emerald-900 transition hover:bg-emerald-50 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-emerald-100 bg-white px-4 py-3 text-sm md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-emerald-900 transition hover:bg-emerald-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
