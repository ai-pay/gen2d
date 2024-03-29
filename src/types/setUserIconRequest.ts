import { z } from "zod";

export const setUserIconRequest = z.object({
  imageId: z.string(),
});

export type SetUserIconRequest = z.infer<typeof setUserIconRequest>;