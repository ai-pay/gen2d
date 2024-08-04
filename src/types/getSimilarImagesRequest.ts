
import { z } from "zod";

export const getSimilarImagesRequest = z.object({
  imageId: z.string(),
});

export type GetSimilarImagesRequest = z.infer<typeof getSimilarImagesRequest>;
