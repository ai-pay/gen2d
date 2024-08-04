import { GenerateImageRequest } from "../types/generateImageRequest";
import { GenerateImagesResponseBody } from "../app/api/generate/image/route";
import { reloadCreditsRemaining } from "./reloadCreditsRemaining";
import { useState } from "react";
import toast from "react-hot-toast";

export type GenerationsRequest = {
  key: string;
  request: GenerateImageRequest;
  response: {
    type: "pending";
  } | {
    type: "success";
    imageId: string;
    imageUrl: string;
  } | {
    type: "error";
    error: string;
  };
};

export function useGenerateImage() {
  const [loading, setLoading] = useState(false);
  const [imageGenerations, setImageGenerations] = useState<GenerationsRequest[]>([
    // {
    //   key: "test",
    //   request: {
    //     prompt: "some random prompt",
    //     modelDetails: {
    //       model: "dall-e-3",
    //       quality: "standard",
    //       style: "vivid",
    //     },
    //   },
    //   response: {
    //     type: "pending",
    //   },
    // },
    // {
    //   key: "test2",
    //   request: {
    //     prompt: "some random prompt",
    //     modelDetails: {
    //       model: "dall-e-3",
    //       quality: "standard",
    //       style: "vivid",
    //     },
    //   },
    //   response: {
    //     type: "success",
    //     imageId: "test",
    //     imageUrl: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    //   },
    // },
    // {
    //   key: "test3",
    //   request: {
    //     prompt: "some random prompt",
    //     modelDetails: {
    //       model: "dall-e-3",
    //       quality: "standard",
    //       style: "vivid",
    //     },
    //   },
    //   response: {
    //     type: "error",
    //     error: "test",
    //   },
    // },
  ]);

  const generateImage = async (
    modelDetails: GenerateImageRequest["modelDetails"],
    prompt: string,
  ) => {
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
    };

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const randomId = Math.random().toString(36).substring(10);

    try {
      setImageGenerations((prev) => [
        {
          key: randomId,
          request,
          response: {
            type: "pending",
          },
        },
        ...prev,
      ]);

      const response = await fetch("/api/generate/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const data = await response.json() as GenerateImagesResponseBody;

        setImageGenerations((prev) => {
          return prev.map((generation) => {
            if (generation.key === randomId) {
              return {
                key: randomId,
                request,
                response: {
                  type: "success",
                  imageId: data.imageId,
                  imageUrl: data.imageUrl,
                },
              };
            } else {
              return generation;
            }
          });
        });

        await reloadCreditsRemaining();
      } else {
        const data = await response.json() as { error: string };

        setImageGenerations((prev) => {
          return prev.map((generation) => {
            if (generation.key === randomId) {
              return {
                key: randomId,
                request,
                response: {
                  type: "error",
                  error: data.error,
                },
              };
            } else {
              return generation;
            }
          });
        });

        toast.error(`Failed to generate image with error: ${data.error}`);
      }
    } catch {
      toast.error("Failed to generate image.");
    }
  };

  return {
    loading,
    imageGenerations,
    generateImage,
  };
}
