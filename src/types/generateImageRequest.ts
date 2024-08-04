import { z } from "zod";

// import { supportedImageModels } from "ai-pay";

export const dalle3ModelDetails = z.object({
  model: z.enum(["dall-e-3"]),
  quality: z.enum(["standard", "hd"]),
  style: z.enum(["vivid", "natural"]),
});
export type Dalle3ModelDetails = z.infer<typeof dalle3ModelDetails>;

export const stabilityAICoreModelDetails = z.object({
  model: z.enum(["stability-ai-core"]),
  negative_prompt: z.optional(z.string()),
});
export type StabilityAICoreModelDetails = z.infer<typeof stabilityAICoreModelDetails>;

export const generateImageRequest = z.object({
  prompt: z.string().min(1),
  modelDetails: z.union([
    dalle3ModelDetails,
    stabilityAICoreModelDetails,
  ]),
});

export type GenerateImageRequest = z.infer<typeof generateImageRequest>;
