import { redis } from "../redisClient";
import { RECENT_IMAGE_IDS_KEY } from "./key";

export async function fetchRecentImageIds(numImages: number = 400) {
  return await redis.lrange(RECENT_IMAGE_IDS_KEY, 0, numImages);
}