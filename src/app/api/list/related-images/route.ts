import { NextRequest, NextResponse } from "next/server";
import { getFirebaseServerDecodedToken } from "@/utils/firebase/getServerToken";
import { getRelatedImagesRequest } from "../../../../types/getRelatedImagesRequest";
import { queryRelatedImages } from "../../../../database/vector/queryPrompt";

export const runtime = "edge";

export const POST = async function(req: NextRequest) {
  const decodedToken = await getFirebaseServerDecodedToken();
  const uid = decodedToken?.uid;

  const parseResult = getRelatedImagesRequest.safeParse(await req.json());

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

  const {
    prompt,
  } = parseResult.data;

  const images = await queryRelatedImages(prompt, uid);

  const response: {
    imageIds: string[];
  } = {
    imageIds: images?.map((image) => String(image.id)) || [],
  };

  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

