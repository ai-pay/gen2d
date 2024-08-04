import { ImageDetails } from "../../../types/imageDetails";
import { imageDetailsKeyGen } from "./key";
import { redis } from "../redisClient";

export async function fetchImageDetails(imageId: string) {
  return await redis.json.get(imageDetailsKeyGen(imageId)) as ImageDetails | null;
}
