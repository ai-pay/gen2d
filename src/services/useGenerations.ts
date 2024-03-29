import { useDisplayImageIdsStore } from "@/store/displayImageIds";
import { GetRelatedImagesRequest } from "@/types/getRelatedImagesRequest";
import { AiPayClient } from "ai-pay";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";

export const fetchRelatedImages = async (prompt: string) => {
  const aiPaySessionId = AiPayClient.getInstance().getClientSessionId();
  const body: GetRelatedImagesRequest = {
    prompt,
    aiPaySessionId,
  };

  const response = await fetch("/api/list/related-images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data.imageIds as string[];
};

export const fetchRecentImagesIds = async () => {
  const response = await fetch("/api/list/recent-images");
  const data = await response.json();
  return data.imageIds as string[];
};

export function useGenerations(initialImageIds: string[] = []) {
  const query = useDisplayImageIdsStore((state) => state.queryType);
  const setImageIds = useDisplayImageIdsStore((state) => state.setImageIds);

  const prompt = "prompt" in query ? query.prompt : undefined;

  const fetchImages = useCallback(async () => {
    const toastId = toast.loading("Loading images...");
    setImageIds(undefined);
    try {
      if (prompt) {
        setImageIds(await fetchRelatedImages(prompt));
      } else {
        setImageIds(await fetchRecentImagesIds());
      }
      toast.success("Images Loaded.", { id: toastId });
    } catch (error) {
      console.error("Failed to fetch images", error);
      toast.success("Failed to load images.", { id: toastId });
    }

  }, [prompt, setImageIds]);

  useEffect(() => {
    setImageIds(initialImageIds);
  }, [setImageIds, initialImageIds]);

  useEffect(() => {
    fetchImages();
  }, [query, fetchImages]);

  return {
    reloadImages: fetchImages
  };
}
