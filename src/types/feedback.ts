import { z } from "zod";

export const feedbackFrom = z.object({
  feedback: z.string().min(3, {
    message: "Feedback requires at least 3 characters",
  }).max(5000, {
    message: "Feedback requires less than 5000 characters",
  }),
});

export type FeedbackForm = z.infer<typeof feedbackFrom>;
