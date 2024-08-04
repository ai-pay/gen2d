import { index } from "./client";

export async function getVector(imageId: string) {
  const results = await index.fetch([imageId], {
    includeVectors: true,
  });

  if (!results || results.length === 0) {
    return undefined;
  }

  return results[0]?.vector;
}
