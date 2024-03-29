import { NextRequest, NextResponse } from "next/server";
import { queryRelatedImages } from "../../../../database/vector/query";
import { getRelatedImagesRequest } from "../../../../types/getRelatedImagesRequest";

export const runtime = "edge";

export const POST = async function (req: NextRequest) {

  const parseResult = getRelatedImagesRequest.safeParse(await req.json());

  if (parseResult.success === false) {
    return new NextResponse(JSON.stringify({ error: `Invalid request body. ${parseResult.error}` }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { prompt, aiPaySessionId } = parseResult.data;

  const imageIds = await queryRelatedImages(prompt, aiPaySessionId);

  return new NextResponse(JSON.stringify({ 
    imageIds
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

