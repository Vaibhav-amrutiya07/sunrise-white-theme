
import type { Metadata } from "next";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Sunrise Builders – Project Enquiries",
  description:
    "Get in touch with Sunrise Builders for residential, commercial, industrial and infrastructure construction enquiries.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
