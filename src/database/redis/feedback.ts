import { FeedbackForm } from "../../types/feedback";
import { redis } from "./redisClient";

export function submitFeedback(feedback: FeedbackForm, uid: string | undefined) {
  redis.lpush("feedback", JSON.stringify({
    ...feedback,
    timestamp: Date.now(),
    userId: uid ?? "anonymous",
  }));
}
