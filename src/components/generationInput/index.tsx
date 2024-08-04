"use client";

import { AboveInputAiPayButton } from "./aboveInputAiPayButton";
import { AdvancedModelSelection } from "./advancedFeaturesInput";
import { DisplayGenerations } from "./displayGenerations";
import { GenerateImageRequest } from "../../types/generateImageRequest";
import { GeneratePromptInput } from "./promptInput";
import { useGenerateImage } from "../../services/useGenerateImage";
import { useState } from "react";

export function GenerationInput({
  uid,
  defaultModelDetails,
  defaultPrompt,
}: {
  uid: string | undefined
  defaultModelDetails: string | undefined
  defaultPrompt: string | undefined
}) {
  const [modelDetails, setModelDetails] = useState<GenerateImageRequest["modelDetails"]>(defaultModelDetails ? JSON.parse(defaultModelDetails) : {
    model: "dall-e-3",
    quality: "standard",
    style: "vivid",
  });

  const {
    loading,
    imageGenerations,
    generateImage,
  } = useGenerateImage();

  return <div
    className="w-full flex flex-col justify-center items-center my-24 gap-24">
    <div
      className="relative flex flex-col  gap-3 justify-center w-[80vw] sm:w-[512px]">

      <AboveInputAiPayButton
        uid={uid} />

      <GeneratePromptInput
        defaultPrompt={defaultPrompt}
        loading={loading}
        generateImage={function(prompt: string): void {
          generateImage(modelDetails, prompt);
        } } />

      <AdvancedModelSelection
        modelDetails={modelDetails}
        setModelDetails={setModelDetails} />

    </div>
    <DisplayGenerations
      generations={imageGenerations}
    />
  </div>;
}
