
import { NextRequest, NextResponse } from "next/server";
import { feedbackFrom } from "../../../types/feedback";
import { getFirebaseServerDecodedToken } from "@/utils/firebase/getServerToken";
import { submitFeedback } from "../../../database/redis/feedback";

export const runtime = "edge";

export const POST = async function(req: NextRequest) {
  const decodedToken = await getFirebaseServerDecodedToken();
  const uid = decodedToken?.uid;

  const parseResult = feedbackFrom.safeParse(await req.json());

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

  await submitFeedback(parseResult.data, uid);

  return new Response("Hello, world!");
};

