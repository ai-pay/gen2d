import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { imageGeneration, ImageGenerationRequest } from "ai-pay";
import { uploadImage } from "../../../../database/cloudflare/uploadImage";
import { imageSizeVariants, ImageSizeVariant, generateImageUrl } from "../../../../database/cloudflare/generateImageUrl";
import { loadImageBufferFromUrl } from "../../../../database/cloudflare/loadImageBufferFromUrl";
import { addImageDetails } from "../../../../database/redis/imageDetails/addImageDetails";
import { addImageId } from "../../../../database/redis/recentImageIds/addImageId";
import { redis } from "../../../../database/redis/redisClient";
import { addUserImage } from "../../../../database/redis/userDetails/addUserImage";
import { upsertImage } from "../../../../database/vector/upsert";
import { generateImageRequest } from "../../../../types/generateImageRequest";
import { generateImageId } from "../../../../utils/generateImageId";


function base64ToArrayBuffer(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export type GenerateImagesResponseBody = {
  imageId: string;
  imageUrl: string;
}

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

  const imgGenRequest: ImageGenerationRequest = (() => {
    switch (modelDetails.model) {
    case "stability-ai-core": {
      return {
        prompt,
        imageModel: "stability-ai-core",
      };
    }
    case "dall-e-2": {
      return {
        prompt,
        imageModel: "dall-e-2",
        size: "1024x1024",
      };
    }
    case "dall-e-3": {
      return {
        prompt,
        imageModel: "dall-e-3",
        size: "1024x1024",
        quality: modelDetails.quality,
        style: modelDetails.style,
      };
    }
    }
  })();

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

  await addImageId(imageId, pipeline);

  await addImageDetails(imageId, {
    createdAt: Date.now(),
    sizeVariants: imageSizeVariants as unknown as ImageSizeVariant[],
    prompt,
    modelDetails,
    ownerId: session?.user.id,
    likes: [],
    dislikes: [],
  }, pipeline);

  if (session?.user.id) {
    await addUserImage(session.user.id, imageId, pipeline);
  }

  // TODO: Promise.all
  if ("imageUrls" in data) {
    const imageBuffer = await loadImageBufferFromUrl(data.imageUrls[0]);
    await uploadImage(imageBuffer, imageId);
  } else {
    const imageBuffer = base64ToArrayBuffer(data.image);
    await uploadImage(imageBuffer, imageId);
  }
  await upsertImage(imageId, {
    prompt,
  }, aiPaySessionId);
  try {
    await pipeline.exec();
  } catch (e) {
    console.error(e);
  }

  const responseBody: GenerateImagesResponseBody = {
    imageId,
    imageUrl: generateImageUrl(imageId, "1024", "img"),
  };

  return new NextResponse(JSON.stringify(responseBody), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });

};

