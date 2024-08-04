import { fetchRecentImageIds } from "./recentImageIds/fetchRecentImageIds";

export async function getRandomImageId() {
  const recentImageIds = await fetchRecentImageIds(1000);

  return recentImageIds[Math.floor(Math.random() * recentImageIds.length)];
}
