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
import ProcessSection from "@/components/ProcessSection";
import ProductCollections from "@/components/ProductCollections";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import { getSectionVisibility, websiteContent } from "@/lib/content";
import type { Language } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
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

  const site = websiteContent.site[language];
  const products = websiteContent.products[language];
  const interactiveBed = websiteContent.interactiveBed[language];
  const process = websiteContent.process[language];
  const visibleSections = useMemo(
    () => getSectionVisibility(websiteContent, language),
    [language]
  );

  return (
    <>
      <Header
        content={site}
        allContent={websiteContent}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main id="top">
        <HeroSection hero={site.hero} />
        <InteractiveBedExplorer content={interactiveBed} />
        <ProductCollections products={products} />
        <WhyChooseUsSection content={site.whyChooseUs} />
        <AboutSection about={site.about} />
        <GallerySection gallery={websiteContent.gallery} language={language} />
        <CatalogSection catalog={websiteContent.catalog} language={language} />
        <ProcessSection process={process} />
        <MapSection map={websiteContent.map} language={language} />
        <ContactSection contact={websiteContent.contact} language={language} />
      </main>
      <Footer
        site={site}
        footer={websiteContent.footer}
        language={language}
        visibleSections={visibleSections}
      />
    </>
  );
}
