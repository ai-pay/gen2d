import { EMBEDDING_MODEL } from "./client";
import OpenAI from "openai";

export async function getEmbeddings(text: string, uid?: string) {
  const client = new OpenAI(uid ? {
    apiKey: `${process.env.AIP_API_KEY}-${uid}`,
    baseURL: "https://api.ai-pay.dev/api/openai-compatible",
  } : {
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const embeddingsResp = await client.embeddings.create({
      model: EMBEDDING_MODEL,
      input: [text],
    });

    return embeddingsResp.data[0].embedding;
  } catch (e) {
    if (uid) {
      return getEmbeddings(text);
    }
    return null;
  }
}
