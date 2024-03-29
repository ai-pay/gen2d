
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextResponse } from "next/server";
import { getUserDetails } from "@/database/redis/userDetails/getUserDetails";
import { addUserDetails } from "@/database/redis/userDetails/addUserDetails";

export const GET = async function () {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized. Login to make a request" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  let details = await getUserDetails(session.user.id);

  if (!details) {
    details = await addUserDetails(session.user.id, {
      profileImageId: "",
      imageIds: [],
    });
  }

  return new NextResponse(JSON.stringify(details), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

};

