import { ImageDetails } from "@/types/imageDetails";
import { Client, redis } from "../redisClient";
import { imageDetailsKeyGen } from "./key";

export async function addImageDetails(
  imageId: string, 
  imageDetails: ImageDetails,
  client: Client = redis
) {
  await client.json.set(imageDetailsKeyGen(imageId), "$", imageDetails);
}