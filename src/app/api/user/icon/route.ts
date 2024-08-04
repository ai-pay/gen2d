
import { NextRequest, NextResponse } from "next/server";
import { getFirebaseServerDecodedToken } from "@/utils/firebase/getServerToken";
import { setProfileImageId } from "@/database/redis/userDetails/setProfileImageId";
import { setUserIconRequest } from "@/types/setUserIconRequest";

export const runtime = "edge";

export const POST = async function(req: NextRequest) {
  const decodedToken = await getFirebaseServerDecodedToken();
  const uid = decodedToken?.uid;

  if (!uid) {
    return new NextResponse(JSON.stringify({
      error: "Not authenticated",
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const parseResult = setUserIconRequest.safeParse(await req.json());

  if (parseResult.success === false) {
    return new NextResponse(JSON.stringify({
      error: `Invalid request body. ${parseResult.error}`,
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  await setProfileImageId(uid, parseResult.data.imageId);

  return new NextResponse(JSON.stringify({}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

