
export const imageSizeVariants = ["1024", "512", "256", "128", "64"] as const;

export type ImageSizeVariant = typeof imageSizeVariants[number];

export function generateImageUrl(
  imageId: string,
  variantName: ImageSizeVariant,
  type: "img" | "icon" = "img",
) {
  return `https://${type}.gen2d.dev/${imageId}-${variantName}.jpg`;
}
