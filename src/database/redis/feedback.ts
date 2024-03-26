import { FeedbackForm } from "@/types/feedback";
import { redis } from "./redisClient";

export function submitFeedback(feedback: FeedbackForm) {
  redis.lpush("feedback", JSON.stringify(feedback));
}