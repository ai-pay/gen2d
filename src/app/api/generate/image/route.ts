import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { generateImageRequest } from "@/types/generateImageRequest";
import { imageGeneration, ImageGenerationRequest } from "ai-pay";
import { generateImageId } from "@/utils/generateImageId";
import { uploadImage } from "../../../../database/cloudflare/uploadImage";
import { addImageId } from "@/database/redis/recentImageIds/addImageId";
import { addImageDetails } from "@/database/redis/imageDetails/addImageDetails";
import { addUserImage } from "@/database/redis/userDetails/addUserImage";
import { redis } from "@/database/redis/redisClient";
import { upsertImage } from "@/database/vector/upsert";

export const POST = async function (req: NextRequest) {
  const session = await getServerSession(authOptions);

  const parseResult = generateImageRequest.safeParse(await req.json());

  if (parseResult.success === false) {
    return new NextResponse(JSON.stringify({ error: `Invalid request body. ${parseResult.error}` }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { 
    prompt,
    aiPaySessionId,
    modelDetails,
  } = parseResult.data;

  if (session) {
    session.user.id;
  }

  const imgGenRequest: ImageGenerationRequest = {
    prompt,
    size: "1024x1024",
    ...(modelDetails.model === "dall-e-3" ? {
      imageModel: modelDetails.model,
      quality: modelDetails.quality,
      style: modelDetails.style,
    } : {
      imageModel: modelDetails.model,
    }),
  };

  const {
    data,
    error,
    debugError
  } = await imageGeneration(imgGenRequest, {
    sessionId: aiPaySessionId,
  });

  if (!data) {
    if (debugError) {
      console.error(debugError);
    }
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const imageId = generateImageId();

  const pipeline = redis.pipeline();

  addImageId(imageId, pipeline);

  addImageDetails(imageId, {
    createdAt: Date.now(),
    prompt,
    modelDetails,
    ownerId: session?.user.id,
    likes: [],
    dislikes: [],
  }, pipeline);

  if (session?.user.id) {
    addUserImage(session.user.id, imageId, pipeline);
  }

  // TODO: Promise.all
  await uploadImage(data.imageUrls[0], imageId);
  await pipeline.exec();
  await upsertImage(imageId, {
    prompt,
  }, aiPaySessionId);

  return new NextResponse(JSON.stringify({ 
    imageUrl: data.imageUrls[0]
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

};

