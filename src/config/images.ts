// All photos are Unsplash placeholders, kept in ONE place so they can be swapped
// for the client's own photography. Pass either an Unsplash photo ID or any full URL.
// If an ID ever 404s, replace it here – the UI falls back to a navy gradient.
const u = (id: string, w = 1600) =>
  id.startsWith("http")
    ? id
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  hero: u("photo-1486406146926-c627a92ad1ab"),
  intro: u("photo-1541888946425-d81bb19240f5", 1200),
  aboutBanner: u("photo-1504307651254-35680f356dfd"),
  servicesBanner: u("photo-1541888946425-d81bb19240f5"),
  contactBanner: u("photo-1431576901776-e539bd916ba2"),
  residential: [
    u("photo-1600596542815-ffad4c1539a9", 1400),
    u("photo-1545324418-cc1a3fa10c00", 1000),
    u("photo-1600585154340-be6161a56a0c", 1000),
  ],
  commercial: [
    u("photo-1486325212027-8081e485255e", 1400),
    u("photo-1497366216548-37526070297c", 1000),
    u("photo-1486406146926-c627a92ad1ab", 1000),
  ],
  industrial: [
    u("photo-1565793298595-6a879b1d9492", 1400),
    u("photo-1553413077-190dd305871c", 1000),
    u("photo-1581091226825-a6a2a5aee158", 1000),
  ],
  infrastructure: [
    u("photo-1504307651254-35680f356dfd", 1400),
    u("photo-1541888946425-d81bb19240f5", 1000),
    u("photo-1503387762-592deb58ef4e", 1000),
  ],
};
