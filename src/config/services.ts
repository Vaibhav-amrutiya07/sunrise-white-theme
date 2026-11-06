import { images } from "./images";

export type Service = {
  slug: string;
  no: string;
  title: string;
  short: string;
  heading: string;
  body: string;
  expertise: string[];
  images: string[];
};

export const services: Service[] = [
  {
    slug: "residential",
    no: "01",
    title: "Residential Construction",
    short: "Creating comfortable and functional living spaces designed around modern lifestyles.",
    heading: "Spaces Designed for Living.",
    body: "We undertake residential construction projects focused on comfort, functionality and modern living requirements.",
    expertise: ["Individual Houses", "Luxury Villas", "Residential Apartments", "Multi-Storey Buildings", "Residential Developments"],
    images: images.residential,
  },
  {
    slug: "commercial",
    no: "02",
    title: "Commercial Construction",
    short: "Developing practical and professional spaces that support businesses, workplaces and commercial activities.",
    heading: "Building Spaces for Business Growth.",
    body: "We provide commercial construction solutions that combine functional layouts, efficient space utilisation and professional execution.",
    expertise: ["Office Buildings", "Commercial Complexes", "Retail Shops & Showrooms", "Shopping Centres", "Mixed-Use Commercial Buildings"],
    images: images.commercial,
  },
  {
    slug: "industrial",
    no: "03",
    title: "Industrial Construction",
    short: "Construction solutions for industrial buildings, facilities and operational spaces with a focus on functionality and durability.",
    heading: "Infrastructure for Industrial Progress.",
    body: "We focus on developing industrial spaces designed to support operational requirements, functionality and long-term usability.",
    expertise: ["Industrial Buildings", "Manufacturing Facilities", "Warehouses", "Factory Buildings", "Industrial Civil Works"],
    images: images.industrial,
  },
  {
    slug: "infrastructure",
    no: "04",
    title: "Infrastructure Development",
    short: "Supporting infrastructure and civil development projects through systematic planning and construction execution.",
    heading: "Building the Foundation of Progress.",
    body: "We undertake civil and infrastructure-related construction works with an emphasis on systematic planning, execution and quality-focused practices.",
    expertise: ["Civil Construction", "Infrastructure Projects", "Site Development", "Structural Works", "Development-Related Construction"],
    images: images.infrastructure,
  },
];
