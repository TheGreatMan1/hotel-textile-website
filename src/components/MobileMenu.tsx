"use client";

import type { NavLink } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  brandName: string;
};

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  brandName
}: MobileMenuProps) {
  const brandMain = brandName.replace(/\s*Hotel Textiles$/i, "");

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/55 backdrop-blur-sm lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="ml-auto flex h-full w-full max-w-sm flex-col bg-ivory p-6 shadow-soft dark:bg-ink"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/35 bg-champagne/20 text-brass dark:border-champagne/40 dark:bg-champagne/10 dark:text-champagne">
                  <Sparkles aria-hidden size={20} strokeWidth={1.6} />
                </span>
                <span className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">
                  {brandMain}
                </span>
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
            <nav
              className="mt-10 flex flex-col gap-2"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-md px-3 py-4 text-base font-bold uppercase tracking-[0.08em] text-charcoal transition hover:bg-linen dark:text-ivory dark:hover:bg-stone-900"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
