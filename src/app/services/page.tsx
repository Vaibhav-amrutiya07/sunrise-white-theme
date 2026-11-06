import type { Metadata } from "next";
import ServicesHero from "@/components/heroes/ServicesHero";
import ServicesExplorer from "@/components/services/ServicesExplorer";
import ProjectCta from "@/components/services/ProjectCta";

export const metadata: Metadata = {
  title: "Construction Services – Residential, Commercial & Industrial",
  description:
    "Residential, commercial, industrial and infrastructure construction services from Sunrise Builders – houses, villas, offices, warehouses, civil works and more.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesExplorer />
      <ProjectCta />
    </>
  );
}
