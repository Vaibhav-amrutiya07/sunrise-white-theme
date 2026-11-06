import type { Metadata } from "next";
import { Lato, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import Cursor from "@/components/layout/Cursor";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["500", "600", "700", "800"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "500", "600"], display: "swap" });
const lato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["400", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sunrisebuilders.in"),
  title: { default: "Sunrise Builders – Construction & Infrastructure Company", template: "%s" },
  description:
    "Sunrise Builders delivers residential, commercial, industrial and infrastructure construction across India with quality, precision and commitment.",
  keywords: [
    "sunrise builders", "construction company in india", "residential construction", "commercial construction",
    "industrial construction", "infrastructure development", "building construction services",
    "civil construction company", "residential builders", "commercial building contractors",
  ],
  openGraph: { title: "Sunrise Builders", description: "Building Today. Shaping Tomorrow.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} ${lato.variable}`}>
      <body className="bg-offwhite">
        <SmoothScroll />
        <Preloader />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingActions />
        <Cursor />
      </body>
    </html>
  );
}
