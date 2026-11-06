import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import ServicesTower from "@/components/home/ServicesTower";
import WhyLayers from "@/components/home/WhyLayers";
import FinalCta from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Sunrise Builders – Construction & Infrastructure Company",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <ServicesTower />
      <WhyLayers />
      <FinalCta />
    </>
  );
}
