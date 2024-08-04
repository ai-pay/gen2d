import { Metadata, index } from "./client";
import { getEmbeddings } from "./getEmbeddings";

export async function upsertImage(imageId: string, metadata: Metadata, uid: string) {
  const vector = await getEmbeddings(metadata.prompt, uid);

  if (!vector) {
    return;
  }

  await index.upsert({
    id: imageId,
    vector,
    metadata: metadata,
  });
}
