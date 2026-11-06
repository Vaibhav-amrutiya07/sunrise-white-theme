import type { Metadata } from "next";
import AboutHero from "@/components/heroes/AboutHero";
import { Eyebrow, ScrubText, Words } from "@/components/ui/Text";
import VisionMission from "@/components/about/VisionMission";
import ValuesTimeline from "@/components/about/ValuesTimeline";
import ClosingStatement from "@/components/about/ClosingStatement";

export const metadata: Metadata = {
  title: "About Sunrise Builders – Our Vision & Mission",
  description:
    "Learn about Sunrise Builders – our story, vision, mission and the core values behind every residential, commercial, industrial and infrastructure project.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <section className="bg-offwhite pb-12 pt-12 md:pb-20 md:pt-20">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="self-start lg:sticky lg:top-32">
            <Eyebrow>Our Story</Eyebrow>
            <Words text="Building with Purpose. Growing with Trust." className="font-heading text-4xl font-extrabold leading-[1.1] text-charcoal md:text-5xl" />
          </div>
          <div className="space-y-8 text-xl leading-relaxed text-charcoal">
            <ScrubText text="At Sunrise Builders, we believe that every structure begins with an idea and becomes meaningful through thoughtful planning and quality execution." />
            <ScrubText text="Our approach is centred on understanding the unique requirements of every project and delivering construction solutions that balance functionality, durability and design." />
            <ScrubText text="With a focus on residential, commercial, industrial and infrastructure development, we aim to contribute to the spaces and environments where people live, work and grow." />
          </div>
        </div>
      </section>

      <VisionMission
        vision="To become a trusted name in the construction industry by creating quality spaces and contributing to sustainable development through responsible building practices."
        mission="To deliver reliable construction solutions through careful planning, quality workmanship, professional coordination and a commitment to client satisfaction."
      />

      <ValuesTimeline />

      <ClosingStatement />
    </>
  );
}
