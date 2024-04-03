import { index, Metadata } from "./client";
import { getEmbeddings } from "./getEmbeddings";


export async function upsertImage(imageId: string, metadata: Metadata, aiPaySessionId?: string) {
  const vector = await getEmbeddings(metadata.prompt, aiPaySessionId);

  if (!vector) {
    return;
  }

  await index.upsert({
    id: imageId, 
    vector,
    metadata: metadata
  });
}