import { ImageDetails } from "@/types/imageDetails";
import { imageDetailsKeyGen } from "./key";
import { redis } from "../redisClient";

export async function updateRelatedImages(imageId: string, relatedImageIds: string[]) {
  const field: keyof ImageDetails = "relatedImageIds";

  await redis.json.set(imageDetailsKeyGen(imageId), "$." + field, relatedImageIds);
}
