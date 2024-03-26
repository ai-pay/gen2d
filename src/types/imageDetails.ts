import { GenerateImageRequest } from "./generateImageRequest";

export type ImageDetails = {
    createdAt: number;
    prompt: string;
    modelDetails: GenerateImageRequest["modelDetails"];
    ownerId?: string;
    likes: number[];
    dislikes: number[];
}