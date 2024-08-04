import { getEmbeddings } from "./getEmbeddings";
import { queryVector } from "./queryVector";

export async function queryRelatedImages(prompt: string, uid?: string) {
  const vector = await getEmbeddings(prompt, uid);

  if (!vector) {
    return;
  }

  return await queryVector(vector);
}
