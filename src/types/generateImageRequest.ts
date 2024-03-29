
import { z } from "zod";

import { supportedImageModels } from "ai-pay";

export const generateImageRequest = z.object({
  prompt: z.string(),
  aiPaySessionId: z.string(),
  modelDetails: z.union([
    z.object({
      model: z.enum([supportedImageModels[0]]),
      quality: z.enum(["standard", "hd"]),
      style: z.optional(z.enum(["vivid", "natural"])),
    }),
    z.object({
      model: z.enum([supportedImageModels[1]]),
    }),
    z.object({
      model: z.enum([supportedImageModels[2]]),
      negative_prompt: z.optional(z.string()),
    }),
  ]),
});

export type GenerateImageRequest = z.infer<typeof generateImageRequest>;