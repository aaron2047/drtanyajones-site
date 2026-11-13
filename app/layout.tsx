import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Dr. Tanya O. Jones | Policy & Leadership Forums and Keynote Speaker",
  description: "Leadership strategist and U.S. Army veteran convening policy and leadership forums for government, international and institutional hosts.",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Tanya O. Jones",
  jobTitle: "Leadership strategist and keynote speaker",
  url: "https://drtanyaojones.com",
  founder: { "@type": "Organization", name: "Interactive Advocacy", url: "https://interactiveadvocacy.com" },
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
      </body>
    </html>
  );
}
