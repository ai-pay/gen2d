import { UserDetails } from "@/types/userDetails";
import { Client, redis } from "../redisClient";
import { userDetailsKeyGen } from "./key";
import { createFreeCredits } from "../freeCredits/createFreeCredits";

export async function createNewUser(uid: string, email: string, name: string, client: Client = redis) {
  const userDetails: UserDetails = {
    createdAt: Date.now(),
    imageIds: [],
    profileImageId: "",
    email,
    name,
  };

  await createFreeCredits(uid, client);

  await client.json.set(userDetailsKeyGen(uid), "$", userDetails, {
    nx: true // set only if key does not exist
  });

  return userDetails;
}