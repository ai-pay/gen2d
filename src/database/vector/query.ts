import { index } from "./client";
import { getEmbeddings } from "./getEmbeddings";

export async function queryRelatedImages(prompt: string, aiPaySessionId?: string) {
  const vector = await getEmbeddings(prompt, aiPaySessionId);
  
  if (!vector) {
    return;
  }

  return await index.query({
    vector,
    topK: 35,
    includeMetadata: true,
  });
}