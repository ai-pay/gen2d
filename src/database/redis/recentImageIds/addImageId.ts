import { Client, redis } from "../redisClient";
import { RECENT_IMAGE_IDS_KEY } from "./key";

export async function addImageId(imageId: string, client: Client = redis) {
  await client.lpush(RECENT_IMAGE_IDS_KEY, imageId);
}