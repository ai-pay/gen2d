import { GetRelatedImagesRequest } from "@/types/getRelatedImagesRequest";
import {
  useCallback, useEffect, useRef
} from "react";
import { useDisplayImageIdsStore } from "@/store/displayImageIds";
import toast from "react-hot-toast";

export const fetchRelatedImages = async (prompt: string) => {
  const body: GetRelatedImagesRequest = {
    prompt,
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

export function useGenerations() {
  const firstUpdate = useRef(Date.now());

  const query = useDisplayImageIdsStore((state) => state.queryType);
  const setImageIds = useDisplayImageIdsStore((state) => state.setImageIds);

  const prompt = "prompt" in query ? query.prompt : undefined;

  const fetchImages = useCallback(async () => {
    const toastId = toast.loading("Loading images...", {
      id: "fetchImages",
    });
    setImageIds(undefined);
    try {
      if (prompt) {
        setImageIds(await fetchRelatedImages(prompt));
      } else {
        setImageIds(await fetchRecentImagesIds());
      }
      toast.success("Images Loaded.", {
        id: toastId,
      });
    } catch (error) {
      console.error("Failed to fetch images", error);
      toast.success("Failed to load images.", {
        id: toastId,
      });
    }
  }, [prompt, setImageIds]);

  useEffect(() => {
    if (Date.now() - firstUpdate.current < 1000) {
      return;
    }
    fetchImages();
  }, [query.type, query.type === "search" ? query.prompt : 0, fetchImages]);

  return {
    reloadImages: fetchImages,
  };
}
