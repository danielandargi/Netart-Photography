export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface GalleryImage extends SanityImage {
  _key: string;
  caption?: string;
  alt?: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  thumbnail: SanityImage;
  heroBanner: SanityImage;
  gallery: GalleryImage[];
  order: number;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: SanityImage;
  aboutTitle: string;
  aboutText: string;
  aboutImage: SanityImage;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}

