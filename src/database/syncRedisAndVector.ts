import { fetchImageDetails } from "./redis/imageDetails/fetchImageDetails";
import { index } from "./vector/client";
import { redis } from "./redis/redisClient";
import { upsertImage } from "./vector/upsert";

export async function syndRedisAndVector() {
  const imageIds = await redis.keys("imageDetails-*").then((keys) => keys.map((key) => key.replace("imageDetails-", "")));

  const vectorIds = await index.range({
    cursor: 0,
    limit: 100,
  }).then((res) => res.vectors.map((vector) => vector.id));

  await Promise.all(imageIds.map(async (imageId) => {
    if (!vectorIds.includes(imageId)) {
      const imageDetails = await fetchImageDetails(imageId);

      if (!imageDetails) {
        console.log(`Image details not found for ${imageId}`);
        return;
      }

      await upsertImage(imageId, {
        prompt: imageDetails.prompt,
      });
    }
  }));
}
