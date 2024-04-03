import { Client, redis } from "../redisClient";
import { userDetailsKeyGen } from "./key";

export async function setUserImage(userId: string, imageId: string, client: Client = redis) {
  await client.json.arrappend(userDetailsKeyGen(userId), "$.imageIds", `"${imageId}"`);
}
