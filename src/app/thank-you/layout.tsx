import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You – Sunrise Builders",
  description: "Thank you for contacting Sunrise Builders. Our team will get in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}