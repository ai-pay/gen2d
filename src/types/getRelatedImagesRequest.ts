
import { z } from "zod";

export const getRelatedImagesRequest = z.object({
  prompt: z.string(),
  aiPaySessionId: z.optional(z.string()),
});

export type GetRelatedImagesRequest = z.infer<typeof getRelatedImagesRequest>;