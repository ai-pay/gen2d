import { EMBEDDING_MODEL, index } from "./client";
import OpenAI from "openai";

export async function queryRelatedImages(prompt: string, aiPaySessionId?: string) {
    
  const client = new OpenAI(aiPaySessionId ? {
    apiKey: aiPaySessionId,
    baseURL: "https://api.joinaipay.com/api/openai-compatible"
  } : {
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const embeddingsResp = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: [prompt],
  });

  const vector = embeddingsResp.data[0].embedding;
  
  if (!vector) {
    return;
  }

  return await index.query({
    vector,
    topK: 35,
    includeMetadata: true,
  });
}