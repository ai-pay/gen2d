import { Client, redis } from "../redisClient";
import { addUserDetails } from "./addUserDetails";
import { existsUserDetails } from "./existsUserDetails";
import { userDetailsKeyGen } from "./key";

export async function addUserImage(userId: string, imageId: string, client: Client = redis) {
  if(!(await existsUserDetails(userId))) {
    await addUserDetails(userId, {
      imageIds: [imageId],
      username: ""
    });
  } else {
    await client.json.arrappend(userDetailsKeyGen(userId), "$.imageIds", imageId);
  }
}
