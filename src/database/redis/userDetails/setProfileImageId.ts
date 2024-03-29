import { Client, redis } from "../redisClient";
import { addUserDetails } from "./addUserDetails";
import { getUserDetails } from "./getUserDetails";
import { userDetailsKeyGen } from "./key";

export async function setProfileImageId(userId: string, profileImageId: string, client: Client = redis) {
  const userDetails = await getUserDetails(userId);

  if(!userDetails) {
    await addUserDetails(userId, {
      imageIds: [],
      profileImageId,
    });
  } else {
    await client.json.set(userDetailsKeyGen(userId), "$.profileImageId", `"${profileImageId}"`);
  }
}
