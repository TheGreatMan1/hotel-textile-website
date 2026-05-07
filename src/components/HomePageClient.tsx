"use client";

import AboutSection from "@/components/AboutSection";
import CatalogSection from "@/components/CatalogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InteractiveBedExplorer from "@/components/InteractiveBedExplorer";
import MapSection from "@/components/MapSection";
import MobileQuoteCTA from "@/components/MobileQuoteCTA";
import ProcessSection from "@/components/ProcessSection";
import ProductCollections from "@/components/ProductCollections";
import QuoteFormSection from "@/components/QuoteFormSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import { getSectionVisibility } from "@/lib/content";
import type { Language, WebsiteContent } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

type HomePageClientProps = {
  content: WebsiteContent;
};

export default function HomePageClient({ content }: HomePageClientProps) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");
    const nextLanguage =
      savedLanguage === "en" || savedLanguage === "ge" ? savedLanguage : "en";

    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage === "ge" ? "ka" : "en";
  }, []);

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
    document.documentElement.lang = nextLanguage === "ge" ? "ka" : "en";
  }

  const site = content.site[language];
  const products = content.products[language];
  const interactiveBed = content.interactiveBed[language];
  const process = content.process[language];
  const visibleSections = useMemo(
    () => getSectionVisibility(content, language),
    [content, language]
  );

  return (
    <>
      <Header
        content={site}
        allContent={content}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main id="top">
        <HeroSection hero={site.hero} />
        <InteractiveBedExplorer content={interactiveBed} />
        <ProductCollections products={products} />
        <WhyChooseUsSection content={site.whyChooseUs} />
        <AboutSection about={site.about} />
        <GallerySection gallery={content.gallery} language={language} />
        <CatalogSection catalog={content.catalog} language={language} />
        <ProcessSection process={process} />
        <MapSection map={content.map} language={language} />
        <QuoteFormSection content={content.quoteForm} language={language} />
        <ContactSection contact={content.contact} language={language} />
      </main>
      <Footer
        site={site}
        footer={content.footer}
        language={language}
        visibleSections={visibleSections}
      />
      <MobileQuoteCTA content={content.quoteForm} language={language} />
    </>
  );
}
