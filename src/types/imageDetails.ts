import { ImageSizeVariant } from "@/database/cloudflare/generateImageUrl";
import { GenerateImageRequest } from "./generateImageRequest";

export type ImageDetails = {
    createdAt: number;
    sizeVariants: ImageSizeVariant[];
    prompt: string;
    modelDetails: GenerateImageRequest["modelDetails"];
    ownerId?: string;
    likes: number[];
    dislikes: number[];
}