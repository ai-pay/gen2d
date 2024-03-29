
import axios from "axios";
import sharp from "sharp";
import { generateImageUrl, ImageSizeVariant } from "./generateImageUrl";


const variants: {
  size: number;
  variantId: ImageSizeVariant;
}[] = [
  {
    size: 1024,
    variantId: "1024"
  },
  {
    size: 512,
    variantId: "512"
  },
  {
    size: 256,
    variantId: "256"
  },
  {
    size: 128,
    variantId: "128"
  },
  {
    size: 64,
    variantId: "64"
  },
];

export async function uploadImage(imageBuffer: ArrayBufferLike, imageId: string, type: "img" | "icon" = "img") {

  await Promise.all(variants.map(async ({ size, variantId }) => {
    try {
      const imageUrl = generateImageUrl(imageId, variantId, type);
    
      const resizedImageBuffer = await sharp(imageBuffer)
        .resize(size, size, { fit: "cover" })
        .jpeg()
        .toBuffer();

      const headers = {
        "Authorization": type === "img" ? process.env.CLOUDFLARE_IMAGE_UPLOAD_API_KEY : process.env.CLOUDFLARE_ICON_UPLOAD_API_KEY,
        "Content-Type": "image/jpeg",
      };
    
      await axios.post(imageUrl, resizedImageBuffer, { headers });
    }
    catch (error) {
      console.error("Error uploading image variant:", error);
    }
  }));
}