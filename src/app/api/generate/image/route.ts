import { ImageGenerationRequest } from "ai-pay/models";
import {
  ImageSizeVariant, generateImageUrl, imageSizeVariants
} from "../../../../database/cloudflare/generateImageUrl";
import { NextRequest, NextResponse } from "next/server";
import { addImageDetails } from "../../../../database/redis/imageDetails/addImageDetails";
import { addImageId } from "../../../../database/redis/recentImageIds/addImageId";
import { generateImageId } from "../../../../utils/generateImageId";
import { generateImageRequest } from "../../../../types/generateImageRequest";
import { getFirebaseServerDecodedToken } from "@/utils/firebase/getServerToken";
import { imageGeneration } from "ai-pay";
import { redis } from "../../../../database/redis/redisClient";
import { setUserImage } from "../../../../database/redis/userDetails/setUserImage";
import { uploadImage } from "../../../../database/cloudflare/uploadImage";
import { upsertImage } from "../../../../database/vector/upsert";

export const maxDuration = 300;

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

export const POST = async function(req: NextRequest) {
  try {
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

    const parseResult = generateImageRequest.safeParse(await req.json());

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
      modelDetails,
    } = parseResult.data;

    const imgGenModelDetails = ((): ImageGenerationRequest["modelDetails"] => {
      switch (modelDetails.model) {
        // TODO: allow stability-image-ultra
        case "stability-ai-core": {
          return {
            model: "stability-image-core",
            prompt,
            aspect_ratio: "1:1",
            style_preset: "cinematic", // TODO: make this configurable
          };
        }
        case "dall-e-3": {
          return {
            prompt,
            model: "openai-dall-e-3",
            size: "1024x1024",
            quality: modelDetails.quality,
            style: modelDetails.style,
            response_format: "b64_json",
          };
        }
      }
    })();

    let revisedPrompt: string | undefined;
    let imageBuffer: ArrayBufferLike;

    const res = await imageGeneration(process.env.AI_PAY_API_KEY as string, {
      userId: uid,
      modelDetails: imgGenModelDetails,
    });

    if (!res.success) {
      console.log("res not success", res);

      return new NextResponse(JSON.stringify({
        error: "Failed to generate image",
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if ("base64Image" in res) {
      imageBuffer = base64ToArrayBuffer(res.base64Image);
    } else {
      console.log("base64Image not in response", res);

      return new NextResponse(JSON.stringify({
        error: "Failed to generate image",
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if ("revisedPrompt" in res) {
      revisedPrompt = res.revisedPrompt;
    }

    const imageId = generateImageId();

    const pipeline = redis.pipeline();

    await addImageId(imageId, pipeline);

    await addImageDetails(imageId, {
      createdAt: Date.now(),
      sizeVariants: imageSizeVariants as unknown as ImageSizeVariant[],
      prompt,
      ...(revisedPrompt ? {
        revisedPrompt: revisedPrompt,
      }: {}),
      modelDetails,
      ownerId: uid,
      likes: [],
      dislikes: [],
    }, pipeline);

    if (uid) {
      await setUserImage(uid, imageId, pipeline);
    }

    await uploadImage(imageBuffer, imageId);
    await upsertImage(imageId, {
      prompt: revisedPrompt ?? prompt,
    }, uid);

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
  } catch (e) {
    console.error(e);
    return new NextResponse(JSON.stringify({
      error: "Internal server error",
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

