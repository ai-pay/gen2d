import { z } from "zod";

import { supportedImageModels } from "ai-pay";

export const dalle3ModelDetails = z.object({
  model: z.enum([supportedImageModels[0]]),
  quality: z.enum(["standard", "hd"]),
  style: z.enum(["vivid", "natural"]),
});
export type Dalle3ModelDetails = z.infer<typeof dalle3ModelDetails>;

export const dalle2ModelDetails = z.object({
  model: z.enum([supportedImageModels[1]]),
});
export type Dalle2ModelDetails = z.infer<typeof dalle2ModelDetails>;

export const stabilityAICoreModelDetails = z.object({
  model: z.enum([supportedImageModels[2]]),
  negative_prompt: z.optional(z.string()),
});
export type StabilityAICoreModelDetails = z.infer<typeof stabilityAICoreModelDetails>;



export const generateImageRequest = z.object({
  prompt: z.string().min(1),
  aiPaySessionId: z.string(),
  modelDetails: z.union([
    dalle3ModelDetails,
    dalle2ModelDetails,
    stabilityAICoreModelDetails,
  ]),
});

export type GenerateImageRequest = z.infer<typeof generateImageRequest>;