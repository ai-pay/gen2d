import { RECENT_IMAGE_IDS_KEY } from "./key";
import { redis } from "../redisClient";

export async function fetchRecentImageIds(numImages: number = 400) {
  return await redis.lrange(RECENT_IMAGE_IDS_KEY, 0, numImages);
}
