import { MetadataRoute } from "next";
import { RECENT_IMAGE_IDS_KEY } from "@/database/redis/recentImageIds/key";
import { redis } from "@/database/redis/redisClient";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls = await redis.lrange(RECENT_IMAGE_IDS_KEY, 0, -1) as string[] ?? [];

  const dynamic = urls.map((url) => ({
    url: `https://www.gen2d.dev/img/${url}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: "https://www.gen2d.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.gen2d.dev/dev",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    ...dynamic,
  ];
}
