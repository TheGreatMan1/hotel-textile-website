import type { Metadata } from "next";
import MetaPixel from "@/components/MetaPixel";
import { getFullBrandName } from "@/lib/branding";
import { getContentDocument } from "@/lib/server/contentStore";
import type { SettingsContent } from "@/lib/types";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getContentDocument("settings")) as SettingsContent;
  const fullBrandName = getFullBrandName(settings);

  return {
    metadataBase: new URL(process.env.URL || "http://localhost:3000"),
    title: settings.seoTitle || fullBrandName,
    description: settings.seoDescription,
    openGraph: {
      title: fullBrandName,
      description: settings.seoDescription,
      type: "website"
    },
    icons: {
      icon: "/favicon.svg"
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var savedTheme = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (error) {}
            `
          }}
        />
        {children}
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
      </body>
    </html>
  );
}
