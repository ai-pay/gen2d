import { GenerateImageRequest } from "./generateImageRequest";
import { ImageSizeVariant } from "../database/cloudflare/generateImageUrl";

export type ImageDetails = {
  createdAt: number;
  sizeVariants: ImageSizeVariant[];
  prompt: string;
  revisedPrompt?: string;
  modelDetails: GenerateImageRequest["modelDetails"];
  ownerId?: string;
  likes: number[];
  dislikes: number[];

  relatedImageIds?: string[];
}
