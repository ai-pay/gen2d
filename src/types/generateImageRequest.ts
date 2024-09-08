import { z } from "zod";

// import { supportedImageModels } from "ai-pay";

export const dalle3ModelDetails = z.object({
  model: z.enum(["dall-e-3"]),
  quality: z.enum(["standard", "hd"]),
  style: z.enum(["vivid", "natural"]),
});
export type Dalle3ModelDetails = z.infer<typeof dalle3ModelDetails>;

export const stabilityAIUltraModelDetails = z.object({
  model: z.enum(["stability-ai-ultra"]),
  negative_prompt: z.optional(z.string()),
});

export type StabilityAIUltraModelDetails = z.infer<typeof stabilityAIUltraModelDetails>;

export const stabilityAiCoreStyles = ["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"] as const;
export type StabilityAiCoreStyles = typeof stabilityAiCoreStyles[number];

export const stabilityAICoreModelDetails = z.object({
  model: z.enum(["stability-ai-core"]),
  negative_prompt: z.optional(z.string()),
  style: z.enum(["3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"]),
});

export type StabilityAICoreModelDetails = z.infer<typeof stabilityAICoreModelDetails>;

export const generateImageRequest = z.object({
  prompt: z.string().min(1),
  modelDetails: z.union([
    dalle3ModelDetails,
    stabilityAIUltraModelDetails,
    stabilityAICoreModelDetails,
  ]),
});

export type GenerateImageRequest = z.infer<typeof generateImageRequest>;
