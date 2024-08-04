
import { Index } from "@upstash/vector";

export const EMBEDDING_MODEL = "text-embedding-3-small";

export type Metadata = {
  prompt: string
};

export const index = new Index<Metadata>();
