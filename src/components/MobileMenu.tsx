"use client";

import type { NavLink } from "@/lib/types";
import { X } from "lucide-react";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
};

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm lg:hidden">
      <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-ivory p-6 shadow-soft dark:bg-ink">
        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">
            Menu
          </span>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X aria-hidden size={20} />
          </button>
        </div>
        <nav className="mt-10 flex flex-col gap-2" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-3 py-4 text-lg font-semibold text-charcoal transition hover:bg-linen dark:text-ivory dark:hover:bg-stone-900"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
