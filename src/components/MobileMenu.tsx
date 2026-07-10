"use client";

import type { NavLink } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  brandName: string;
  brandDescriptor: string;
};

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  brandName,
  brandDescriptor
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="ml-auto flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.16)] dark:bg-[#181818]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center border border-peach/60 text-peach dark:border-[#d99677]/60 dark:text-[#ebb49a]">
                  <Sparkles aria-hidden size={17} strokeWidth={1.5} />
                </span>
                <span className="min-w-0 text-graphite dark:text-white">
                  <span className="block truncate text-xl font-light uppercase tracking-[0.12em]">
                    {brandName}
                  </span>
                  {brandDescriptor ? (
                    <span className="mt-1 block truncate text-[8px] font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                      {brandDescriptor}
                    </span>
                  ) : null}
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
              className="mt-8 flex flex-col border-t border-stone-200 dark:border-stone-800"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="border-b border-stone-200 px-1 py-4 text-sm font-medium uppercase tracking-[0.12em] text-graphite transition hover:pl-3 hover:text-peach dark:border-stone-800 dark:text-white dark:hover:text-[#ebb49a]"
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
