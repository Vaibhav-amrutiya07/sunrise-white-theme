import type { Metadata } from "next";
import { site } from "@/config/site";
import { serviceOptions } from "@/lib/enquiryValidation";
import ContactHero from "@/components/heroes/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import EnquiryForm from "@/components/contact/EnquiryForm";
import LocationShowcase from "@/components/contact/LocationShowcase";
import { SwapArrow } from "@/components/ui/Arrow";

export const metadata: Metadata = {
  title: "Contact Sunrise Builders – Project Enquiries",
  description: "Get in touch with Sunrise Builders for residential, commercial, industrial and infrastructure construction enquiries.",
};


export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const query = await searchParams;
  const requestedService = typeof query.service === "string" ? query.service : "";
  const initialService = serviceOptions.includes(requestedService) ? requestedService : "";
  return (
    <>
      <ContactHero />
      <ContactInfo />

      {/* enquiry: split-screen editorial layout */}
      <section id="enquiry" className="relative scroll-mt-24 bg-offwhite pb-12 md:pb-20">
        <div className="wrap">
          <div className="crop-marks relative grid overflow-visible shadow-[0_50px_100px_-50px_rgba(24,50,74,.45)] lg:grid-cols-12">
            {/* left: gold brief panel */}
            <div className="relative overflow-hidden bg-gold p-8 text-navy sm:p-12 lg:col-span-5 lg:p-14">
              <div aria-hidden className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full border border-navy/25" />
              <div aria-hidden className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full border border-dashed border-navy/25" />
              <div className="relative flex h-full flex-col">
                <p className="mb-6 flex items-center gap-3 font-sub text-xs font-semibold uppercase tracking-[0.3em] text-navy">
                  <span className="h-px w-8 bg-navy" /> Enquiry
                </p>
                <h2 className="font-heading text-[clamp(2.4rem,4.6vw,4rem)] font-extrabold leading-[1] tracking-tight">
                  Tell Us What You&apos;re <span className="outline-text-navy">Planning.</span>
                </h2>
                <p className="mt-6 max-w-sm font-sub leading-relaxed text-navy/80">
                  Share a few details about your construction requirements. Our team will get in touch with you.
                </p>

                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-12 inline-flex items-center gap-4 self-start rounded-full border border-navy/25 py-2 pl-2 pr-5 font-sub text-sm font-semibold transition-colors duration-500 hover:border-navy lg:mt-auto"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-navy-deep">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2Z" /></svg>
                  </span>
                  Prefer WhatsApp? Chat with us
                  <span className="text-navy"><SwapArrow className="h-3.5 w-3.5" /></span>
                </a>
              </div>
            </div>

            {/* right: the form */}
            <div className="relative bg-white p-7 sm:p-12 lg:col-span-7 lg:p-14">
              <EnquiryForm initialService={initialService} />
            </div>
          </div>
        </div>
      </section>

      <LocationShowcase />
    </>
  );
}