
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { setUserIconRequest } from "@/types/setUserIconRequest";
import { setProfileImageId } from "@/database/redis/userDetails/setProfileImageId";

export const POST = async function (req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized. Login to make a request" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const parseResult = setUserIconRequest.safeParse(await req.json());

  if (parseResult.success === false) {
    return new NextResponse(JSON.stringify({ error: `Invalid request body. ${parseResult.error}` }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  await setProfileImageId(session.user.id, parseResult.data.imageId);

  return new NextResponse(JSON.stringify({}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

};

