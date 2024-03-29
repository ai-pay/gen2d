import { Client, redis } from "../redisClient";
import { addUserDetails } from "./addUserDetails";
import { getUserDetails } from "./getUserDetails";
import { userDetailsKeyGen } from "./key";

export async function addUserImage(userId: string, imageId: string, client: Client = redis) {
  const userDetails = await getUserDetails(userId) as { imageIds: string[] } | null;

  if(!userDetails) {
    await addUserDetails(userId, {
      imageIds: [imageId],
      profileImageId: ""
    });
  } else {
    await client.json.arrappend(userDetailsKeyGen(userId), "$.imageIds", `"${imageId}"`);
  }
}
