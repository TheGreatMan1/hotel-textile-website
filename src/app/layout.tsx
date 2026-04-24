import type { Metadata } from "next";
import Script from "next/script";
import settings from "@/content/settings.json";
import "./globals.css";

export const metadata: Metadata = {
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
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on('init', function(user) {
                if (!user && window.location.hash.indexOf('_token=') !== -1) {
                  window.netlifyIdentity.open();
                }
              });

              window.netlifyIdentity.on('login', function() {
                if (!window.location.pathname.startsWith('/admin')) {
                  window.location.href = '/admin/';
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
