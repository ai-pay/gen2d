import { fetchRecentImageIds } from "./recentImageIds/fetchRecentImageIds";

export async function getRandomImageIds(count: number = 100) {
  const recentImageIds = await fetchRecentImageIds(1000);

  return recentImageIds.sort(() => Math.random() - 0.5).slice(0, count);
}
