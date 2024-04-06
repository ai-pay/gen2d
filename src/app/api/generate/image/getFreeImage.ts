import { GenerateImageRequest } from "@/types/generateImageRequest";
import { StabilityAiCoreRequest } from "ai-pay";
import axios, { toFormData } from "axios";
import OpenAI from "openai";

async function moderateInput(prompt: string) {
  const openai = new OpenAI();

  const modRes = await openai.moderations.create({
    model: "text-moderation-latest",
    input: prompt,
  });

  try {
    modRes.results.forEach((mod) => {
      if (mod.flagged) {
        throw new Error();
      }
    });
  } catch (error) {
    return {
      error: "Prompt was flagged for moderation"
    };
  }
}

export async function getFreeImage(
  imgGenRequest: GenerateImageRequest
): Promise<{
  moderated: true,
  error?: string
} | {
  moderated: false,
  base64Image: string,
  revisedPrompt?: string
}> {
  const moderated = await moderateInput(imgGenRequest.prompt);

  if (moderated) {
    return {
      moderated: true,
      error: moderated.error
    };
  }

  if (imgGenRequest.modelDetails.model === "stability-ai-core") {
    const request: StabilityAiCoreRequest = {
      prompt: imgGenRequest.prompt,
      imageModel: "stability-ai-core",
      negative_prompt: imgGenRequest.modelDetails.negative_prompt,
    };

    const response = await axios.postForm(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      toFormData(request, new FormData()),
      {
        validateStatus: undefined,
        responseType: "json",
        headers: { 
          Authorization: `Bearer ${process.env.STABILITY_AI_API_KEY}`,
          Accept: "application/json", 
        },
      },
    );
    
    if (response.status === 200) {
      const data = response.data as {
          "image": string
          "finish_reason": string,
          "seed": number
        };

      return {
        moderated: false,
        base64Image: data.image,
      };
    } 

    throw new Error(`Failed to generate image: ${response.data.error}`);
  } else {
    const openai = new OpenAI();

    const response = await openai.images.generate({
      model: imgGenRequest.modelDetails.model,
      prompt: imgGenRequest.prompt,
      response_format: "b64_json",
      size: "1024x1024",

      ...(imgGenRequest.modelDetails.model === "dall-e-3" ? {
        quality: imgGenRequest.modelDetails.quality,
        style: imgGenRequest.modelDetails.style,
      } : {}),
    });

    return {
      moderated: false,
      base64Image: response.data[0].b64_json as string,
      revisedPrompt: response.data[0].revised_prompt as string,
    };
  }
}