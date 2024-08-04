import { Client, redis } from "../redisClient";
import { UserDetails } from "@/types/userDetails";
// import { createFreeCredits } from "../freeCredits/createFreeCredits";
import { userDetailsKeyGen } from "./key";

export async function createNewUser(uid: string, email?: string, client: Client = redis) {
  const userDetails: UserDetails = {
    createdAt: Date.now(),
    imageIds: [],
    profileImageId: "",
    email,
  };

  await client.json.set(userDetailsKeyGen(uid), "$", userDetails, {
    nx: true, // set only if key does not exist
  });

  return userDetails;
}
