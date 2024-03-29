import { ImageDetails } from "../../../types/imageDetails";
import { redis } from "../redisClient";
import { imageDetailsKeyGen } from "./key";

export async function fetchImageDetails(imageId: string) {
  return await redis.json.get(imageDetailsKeyGen(imageId)) as ImageDetails | null;
}