import { Client, redis } from "../redisClient";
import { addUserDetails } from "./addUserDetails";
import { getUserDetails } from "./existsUserDetails";
import { userDetailsKeyGen } from "./key";

export async function addUserImage(userId: string, imageId: string, client: Client = redis) {
  const userDetails = await getUserDetails(userId) as { imageIds: string[] } | null;

  if(!userDetails) {
    await addUserDetails(userId, {
      imageIds: [imageId],
      username: ""
    });
  } else {
    await redis.json.set(userDetailsKeyGen(userId), "$.imageIds", [...userDetails.imageIds, imageId]);
  }
}
