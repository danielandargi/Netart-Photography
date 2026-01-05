// Get all services ordered by display order
export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    fullDescription,
    thumbnail,
    heroBanner,
    gallery[] {
      _key,
      asset,
      caption,
      alt
    },
    order
  }
`;

// Get a single service by slug
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    fullDescription,
    thumbnail,
    heroBanner,
    gallery[] {
      _key,
      asset,
      caption,
      alt
    },
    order
  }
`;

// Get site settings
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    heroTitle,
    heroSubtitle,
    heroImage,
    aboutTitle,
    aboutText,
    aboutImage,
    email,
    phone,
    whatsapp,
    instagram,
    facebook
  }
`;

// Get all service slugs for static generation
export const serviceSlugsQuery = `
  *[_type == "service"] {
    "slug": slug.current
  }
`;
