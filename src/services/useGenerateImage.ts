import { useState } from "react";
import { useSessionId } from "ai-pay-react-hooks";
import toast from "react-hot-toast";
import { GenerateImagesResponseBody } from "../app/api/generate/image/route";
import { GenerateImageRequest } from "../types/generateImageRequest";
import { useUserSettingsStore } from "@/store/userSettings";

export function useGenerateImage() {
  const sessionId = useSessionId();
  const [loading, setLoading] = useState(false);
  const [imageResponse, setImageResponse] = useState<{
    imageId: string;
    imageUrl: string;
    prompt: string;
  } | null>(null);

  const generateImage = async (
    modelDetails: GenerateImageRequest["modelDetails"], 
    prompt: string
  ) => {
    if (!sessionId && (useUserSettingsStore.getState().freeGenerations ?? 0) <= 0){
      toast.error("Session ID not found. Start an AI Pay session first to generate images.");
      return;
    }

    if (loading) {
      return;
    }
    if (prompt === "") {
      toast.error("Enter a valid prompt.");
      return;
    }

    const request: GenerateImageRequest = {
      modelDetails,
      prompt,
      aiPaySessionId: sessionId,
    };

    setLoading(true);

    const toastId = toast.loading("Generating image...");
    try {
      const response = await fetch("/api/generate/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const data = await response.json() as GenerateImagesResponseBody;

        toast.success("Successfully generated image.", {
          duration: 5000,
          icon: "🔥",
          id: toastId,
        });

        setImageResponse({
          imageId: data.imageId,
          imageUrl: data.imageUrl,
          prompt,
        });
      } else {
        const data = await response.json() as { error: string };

        toast.error(`Failed to generate image with error: ${data.error}`, {
          id: toastId,
        });
      }
    } catch {
      toast.error("Failed to generate image.", {
        id: toastId,
      });
    }

    setLoading(false);
  };

  return {
    loading,
    imageResponse,
    generateImage,
  };
}