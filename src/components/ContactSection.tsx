import { localized } from "@/lib/content";
import type {
  ContactContent,
  ContactMethodKey,
  Language
} from "@/lib/types";
import type { ElementType } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone
} from "lucide-react";

const icons: Record<ContactMethodKey, ElementType> = {
  phone: Phone,
  whatsapp: MessageCircle,
  email: Mail,
  instagram: Instagram,
  facebook: Facebook
};

type ContactSectionProps = {
  contact: ContactContent;
  language: Language;
};

export default function ContactSection({
  contact,
  language
}: ContactSectionProps) {
  if (!contact.isVisible) return null;

  const visibleMethods = contact.methods.filter((method) => method.isVisible);

  return (
    <section id="contact" className="section-padding bg-white dark:bg-stone-950">
      <div className="container-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{language === "en" ? "Contact" : "კონტაქტი"}</p>
          <h2 className="section-title">{localized(contact.title, language)}</h2>
          <p className="section-copy">{localized(contact.description, language)}</p>
        </div>

        {visibleMethods.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {visibleMethods.map((method) => {
              const Icon = icons[method.key];
              const content = (
                <>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-champagne/25 text-brass dark:text-champagne">
                    <Icon aria-hidden size={20} />
                  </span>
                  <span className="text-sm font-semibold text-stone-500 dark:text-stone-400">
                    {localized(method.label, language)}
                  </span>
                  <span className="mt-2 break-words text-base font-bold text-charcoal dark:text-ivory">
                    {method.value}
                  </span>
                </>
              );

              return method.url ? (
                <a
                  key={method.key}
                  href={method.url}
                  className="rounded-lg border border-stone-200 bg-ivory p-5 transition hover:-translate-y-1 hover:border-brass hover:shadow-soft dark:border-stone-800 dark:bg-ink dark:hover:border-champagne"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={method.key}
                  className="rounded-lg border border-stone-200 bg-ivory p-5 dark:border-stone-800 dark:bg-ink"
                >
                  {content}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
