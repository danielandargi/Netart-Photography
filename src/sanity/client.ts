import { createClient, SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

// Check if Sanity is configured
export const isSanityConfigured = Boolean(
  projectId && projectId !== "" && projectId !== "your_project_id_here"
);

// Create client only if configured
let _client: SanityClient | null = null;

export const getClient = (): SanityClient | null => {
  if (!isSanityConfigured) {
    return null;
  }
  
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to true for production for faster cached responses
    });
  }
  
  return _client;
};

export function urlFor(source: { asset?: { _ref: string } }) {
  const client = getClient();
  if (!client) {
    return null;
  }
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}
