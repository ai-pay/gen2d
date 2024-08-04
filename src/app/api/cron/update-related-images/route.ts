import { type NextRequest } from "next/server";
import { getRandomImageId } from "@/database/redis/randomImageId";
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
  const imageId = await getRandomImageId();

  // get related image ids
  const embedding = await getVector(imageId);

  if (!embedding) {
    return Response.json({
      success: false,
    });
  }

  const images = await queryVector(embedding, 20);

  const imageIds = images?.map((image) => String(image.id)) || [];

  // update related image ids
  await updateRelatedImages(imageId, imageIds);

  return Response.json({
    success: true,
  });
}
