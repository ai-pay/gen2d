
const CLOUDFLARE_ACCOUNT_HASH = "UY1fW9Ni-I1MwvzSsBhVog";

export function generateImageUrl(
  imageId: string, 
  variantName: "public" | "512" | "256" | "128" | "64"
) {
  return `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${imageId}/${variantName}`;
}