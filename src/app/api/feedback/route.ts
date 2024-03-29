
import { NextRequest, NextResponse } from "next/server";
import { submitFeedback } from "../../../database/redis/feedback";
import { feedbackFrom } from "../../../types/feedback";

export const runtime = "edge";

export const POST = async function (req: NextRequest) {

  const parseResult = feedbackFrom.safeParse(await req.json());

  if (parseResult.success === false) {
    return new NextResponse(JSON.stringify({ error: `Invalid request body. ${parseResult.error}` }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  await submitFeedback(parseResult.data);

  return new Response("Hello, world!");
};

