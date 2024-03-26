import { redis } from "../redisClient";
import { userDetailsKeyGen } from "./key";

export async function existsUserDetails(userId: string) {
  return await redis.exists(userDetailsKeyGen(userId)) > 0;
}