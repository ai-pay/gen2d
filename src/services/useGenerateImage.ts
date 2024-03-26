import { GenerateImageRequest } from "@/types/generateImageRequest";
import { useState } from "react";
import { useSessionId } from "ai-pay-react-hooks";

export function useGenerateImage() {
  const sessionId = useSessionId();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string | null>(null);

  const generateImage = async (
    modelDetails: GenerateImageRequest["modelDetails"], 
    prompt: string
  ) => {
    if (!sessionId) {
      setError("Session ID not found. Start an AI Pay session first to generate images.");
      return;
    }

    if (loading) {
      return;
    }
    if (prompt === "") {
      setError("Enter a prompt.");
      return;
    }

    const request: GenerateImageRequest = {
      modelDetails,
      prompt,
      aiPaySessionId: sessionId,
    };

    setLoading(true);
    setError(null);

    try {
      console.log({ request });

      const response = await fetch("/api/generate/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      console.log(response);

      if (!response.ok) {
        setError("Failed to generate image.");
      } else {
        const data = await response.json();
        console.log(data);
        // TODO: type check data
        setImage(data.imageUrl);
        setImagePrompt(prompt);
      }
    } catch {
      setError("Failed to generate image.");
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    image,
    imagePrompt,
    generateImage,
  };
}