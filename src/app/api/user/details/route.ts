
import { NextResponse } from "next/server";
import { createNewUser } from "@/database/redis/userDetails/createNewUser";
import { getFirebaseServerDecodedToken } from "@/utils/firebase/getServerToken";
import { getUserDetails } from "@/database/redis/userDetails/getUserDetails";

export const GET = async function() {
  const decodedToken = await getFirebaseServerDecodedToken();
  const uid = decodedToken?.uid;

  if (!uid) {
    return new NextResponse(JSON.stringify({
      error: "Unauthorized. Login to make a request",
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let details = await getUserDetails(uid);

  if (!details) {
    details = await createNewUser(uid, decodedToken.email ?? "");
  }

  return new NextResponse(JSON.stringify(details), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

