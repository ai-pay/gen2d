import { Client, redis } from "../redisClient";
import { userDetailsKeyGen } from "./key";

export async function setProfileImageId(userId: string, profileImageId: string, client: Client = redis) {
  await client.json.set(userDetailsKeyGen(userId), "$.profileImageId", `"${profileImageId}"`);
}
