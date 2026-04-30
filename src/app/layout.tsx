import type { Metadata } from "next";
import MetaPixel from "@/components/MetaPixel";
import settings from "@/content/settings.json";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL || "http://localhost:3000"),
  title: settings.seoTitle,
  description: settings.seoDescription,
  openGraph: {
    title: settings.siteName,
    description: settings.seoDescription,
    type: "website"
  },
  icons: {
    icon: "/favicon.svg"
  }
};

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
