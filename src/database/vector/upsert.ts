import { embeddings } from "ai-pay";
import { EMBEDDING_MODEL, index, Metadata } from "./client";


export async function upsertImage(imageId: string, metadata: Metadata, aiPaySessionId: string) {
  const {
    data,
  } = await embeddings({
    model: EMBEDDING_MODEL,
    inputs: [metadata.prompt],
  }, {sessionId: aiPaySessionId});

  const vector = data?.embeddings[0];

  if (!vector) {
    return;
  }

  await index.upsert({
    id: imageId, 
    vector,
    metadata: metadata
  });
}