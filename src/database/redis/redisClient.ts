import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export type Client = (typeof redis) | ReturnType<typeof redis.pipeline>;


