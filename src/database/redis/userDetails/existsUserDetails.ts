import { redis } from "../redisClient";
import { userDetailsKeyGen } from "./key";

export async function getUserDetails(userId: string) {
  return await redis.json.get(userDetailsKeyGen(userId));
}