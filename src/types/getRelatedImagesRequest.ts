
import { z } from "zod";

export const getRelatedImagesRequest = z.object({
  prompt: z.string(),
});

export type GetRelatedImagesRequest = z.infer<typeof getRelatedImagesRequest>;
