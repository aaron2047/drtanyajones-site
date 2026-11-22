import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "./globals.css";
import { RegisterSW } from "@/components/RegisterSW";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
  themeColor: "#0d132d",
  title: "Dr. Tanya O. Jones | Policy & Leadership Forums and Keynote Speaker",
  description: "Leadership strategist and U.S. Army veteran convening policy and leadership forums for government, international and institutional hosts.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Tanya O. Jones",
  jobTitle: "Leadership strategist and keynote speaker",
  url: "https://drtanyaojones.com",
  worksFor: { "@type": "Organization", name: "Interactive Advocacy", url: "https://www.drtanyaojones.com/interactive-advocacy" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RegisterSW />
      </body>
    </html>
  );
}
