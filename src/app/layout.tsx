import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const scriptFont = Great_Vibes({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rocky Restaurant | Best Fine Dining in Coimbatore",
  description: "Experience the finest luxury-rustic dining in Coimbatore at Rocky Restaurant. Award-winning culinary journey, fresh ingredients, and exceptional service.",
  metadataBase: new URL('https://rockyrestaurant.com'),
  openGraph: {
    title: "Rocky Restaurant | Coimbatore",
    description: "Experience the finest luxury-rustic dining at Rocky Restaurant.",
    siteName: "Rocky Restaurant",
    locale: "en_IN",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Rocky Restaurant",
  "image": "https://rockyrestaurant.com/cover.jpg",
  "@id": "https://rockyrestaurant.com",
  "url": "https://rockyrestaurant.com",
  "telephone": "+914221234567",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Luxury Avenue, RS Puram",
    "addressLocality": "Coimbatore",
    "postalCode": "641002",
    "addressCountry": "IN"
  },
  "servesCuisine": ["Modern Indian", "Continental"],
  "priceRange": "₹₹₹"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${playfair.variable} ${scriptFont.variable} antialiased bg-[#f4f3ed] text-[#0b2e35] font-sans min-h-screen flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar user={user} />
        <main className="flex-1 flex flex-col mt-0 md:mt-20 mb-16 md:mb-0 relative">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
