import { UserDetails } from "@/types/userDetails";
import { Client, redis } from "../redisClient";
import { userDetailsKeyGen } from "./key";

export async function addUserDetails(userId: string, userDetails: Omit<UserDetails, "createdAt">, client: Client = redis) {
  await client.json.set(userDetailsKeyGen(userId), "$", {
    ...userDetails, 
    createdAt: Date.now()
  });
}