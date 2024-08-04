import { type NextRequest } from "next/server";
import { getRandomImageIds } from "@/database/redis/randomImageId";
import { getVector } from "@/database/vector/getVector";
import { queryVector } from "@/database/vector/queryVector";
import { updateRelatedImages } from "@/database/redis/imageDetails/updateRelatedImages";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // get random image id
  const imageIds = await getRandomImageIds(50);

  await Promise.all(imageIds.map(async (imageId) => {
    // get related image ids
    const embedding = await getVector(imageId);

    if (!embedding) {
      return Response.json({
        success: false,
      }, {
        status: 500,
      });
    }

    const images = await queryVector(embedding, 20);

    const relatedImageIds = images?.map((image) => String(image.id)) || [];

    // update related image ids
    await updateRelatedImages(imageId, relatedImageIds);
  }));

  return Response.json({
    success: true,
  });
}
