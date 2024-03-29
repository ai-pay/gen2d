import { z } from "zod";

export const setUserIconRequest = z.object({
  imageId: z.string(),
});

export type GenerateImageRequest = z.infer<typeof setUserIconRequest>;