import { index } from "./client";

export async function queryVector(vector: number[], topK: number = 50) {
  return await index.query({
    vector,
    topK,
    includeMetadata: true,
  });
}
