import type { SiteContent } from "@/lib/types";

type FooterProps = {
  content: SiteContent;
};

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="border-t border-stone-200 bg-ivory py-10 dark:border-stone-800 dark:bg-ink">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <p className="font-serif text-2xl font-semibold text-charcoal dark:text-ivory">
            {content.brandName}
          </p>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
            {content.footer.tagline}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-stone-600 dark:text-stone-400">
          {content.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-brass dark:hover:text-champagne"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-sm text-stone-500 dark:text-stone-500">
          © {new Date().getFullYear()} {content.brandName}.{" "}
          {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
