import type { Metadata } from "next";
import Script from "next/script";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { GOOGLE_SITE_VERIFICATION, SITE_NAME, SITE_URL } from "@/lib/site";

const GA_MEASUREMENT_ID = "G-NEG94NYQ2S";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    "Billets de bateau vers Maroc, l'Espagne, l'Algerie et la France. Informations horaires, prix et liaisons ferry.",
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    shortcut: "/favicon_no_bg.png",
    icon: { url: "/favicon_no_bg.png", sizes: "16x16 32x32 64x64" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${dmSerif.variable} antialiased`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="beforeInteractive"
        />
        <Script id="gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
