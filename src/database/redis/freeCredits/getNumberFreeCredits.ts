import { redis } from "../redisClient";
import { freeCreditsKeyGen } from "./key";

export async function getNumberFreeGenerations(uid: string) {
  return await redis.get(freeCreditsKeyGen(uid)) as number;
}