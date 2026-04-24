"use client";

import AboutSection from "@/components/AboutSection";
import CatalogSection from "@/components/CatalogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import ProductsSection from "@/components/ProductsSection";
import { websiteContent } from "@/lib/content";
import type { Language } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");
    if (savedLanguage === "en" || savedLanguage === "ge") {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage === "ge" ? "ka" : "en";
    }
  }, []);

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("language", nextLanguage);
    document.documentElement.lang = nextLanguage === "ge" ? "ka" : "en";
  }

  const site = websiteContent.site[language];
  const products = websiteContent.products[language];

  return (
    <>
      <Header
        content={site}
        language={language}
        onLanguageChange={handleLanguageChange}
      />
      <main id="top">
        <HeroSection hero={site.hero} />
        <AboutSection about={site.about} />
        <ProductsSection products={products} />
        <GallerySection gallery={websiteContent.gallery} language={language} />
        <CatalogSection catalog={websiteContent.catalog} language={language} />
        <MapSection map={websiteContent.map} language={language} />
        <ContactSection contact={websiteContent.contact} language={language} />
      </main>
      <Footer content={site} />
    </>
  );
}
