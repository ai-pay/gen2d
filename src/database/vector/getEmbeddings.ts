import OpenAI from "openai";
import { EMBEDDING_MODEL } from "./client";

export async function getEmbeddings(text: string, aiPaySessionId?: string) {
  const client = new OpenAI(aiPaySessionId ? {
    apiKey: aiPaySessionId,
    baseURL: "https://api.joinaipay.com/api/openai-compatible"
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
    if (aiPaySessionId) {
      return await getEmbeddings(text);
    }
  }
}