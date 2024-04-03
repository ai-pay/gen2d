import { Client, redis } from "../redisClient";
import { freeCreditsKeyGen } from "./key";

export async function createFreeCredits(
  userId: string,
  client: Client = redis
) {
  await client.set(freeCreditsKeyGen(userId), 3, {
    nx: true,
  });
}