import { getClient, urlFor, isSanityConfigured } from "./client";
import { servicesQuery, serviceBySlugQuery, siteSettingsQuery, serviceSlugsQuery } from "./queries";
import { Service, SiteSettings } from "./types";

export { isSanityConfigured };

// Fetch all services
export async function getServices(): Promise<Service[]> {
  const client = getClient();
  if (!client) {
    return [];
  }
  
  try {
    return await client.fetch(servicesQuery);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Fetch a single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const client = getClient();
  if (!client) {
    return null;
  }
  
  try {
    return await client.fetch(serviceBySlugQuery, { slug });
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}

// Fetch site settings
export async function getSiteSettings(): Promise<SiteSettings | null> {
  const client = getClient();
  if (!client) {
    return null;
  }
  
  try {
    return await client.fetch(siteSettingsQuery);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

// Get all service slugs for static generation
export async function getAllServiceSlugs(): Promise<{ slug: string }[]> {
  const client = getClient();
  if (!client) {
    return [];
  }
  
  try {
    return await client.fetch(serviceSlugsQuery);
  } catch (error) {
    console.error("Error fetching service slugs:", error);
    return [];
  }
}

// Get image URL from Sanity image
// mode: 'crop' - crops to fit dimensions (for thumbnails/previews)
//       'fit' - fits within dimensions preserving aspect ratio
//       'original' - returns high quality image without resizing
export function getImageUrl(
  image: { asset?: { _ref: string } } | null | undefined, 
  width?: number, 
  height?: number,
  mode: 'crop' | 'fit' | 'original' = 'crop'
): string | null {
  if (!image?.asset || !isSanityConfigured) {
    return null;
  }
  
  const builder = urlFor(image);
  if (!builder) {
    return null;
  }
  
  // For original mode, return high quality image without resizing
  if (mode === 'original') {
    return builder.quality(100).auto('format').url();
  }
  
  let result = builder;
  
  // Apply dimensions based on mode
  if (width && height) {
    if (mode === 'crop') {
      // Crop to exact dimensions - good for thumbnails
      result = result.width(width).height(height).fit('crop');
    } else {
      // Fit within dimensions preserving aspect ratio
      result = result.width(width).height(height).fit('max');
    }
  } else if (width) {
    result = result.width(width);
  } else if (height) {
    result = result.height(height);
  }
  
  // Use high quality
  result = result.quality(90).auto('format');
  
  return result.url();
}
