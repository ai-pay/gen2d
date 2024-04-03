"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GenerateImageRequest } from "../../types/generateImageRequest";
import { useGenerateImage } from "../../services/useGenerateImage";
import { GeneratePromptInput } from "./promptInput";
import { useUserSettingsStore } from "@/store/userSettings";
import { AboveInputLogin } from "./aboveInputLogin";
import { SessionProvider } from "next-auth/react";
import { AdvancedModelSelection } from "./advancedFeaturesInput";

export function GenerationInput({
  defaultModelDetails,
  defaultPrompt,
}: {
  defaultModelDetails: string | undefined
  defaultPrompt: string | undefined
}) {
  const [ modelDetails, setModelDetails ] = useState<GenerateImageRequest["modelDetails"]>(defaultModelDetails ? JSON.parse(defaultModelDetails) : {
    model: "dall-e-3",
    quality: "standard",
    style: "vivid"
  });
  
  const {
    loading,
    imageResponse,
    generateImage,
  } = useGenerateImage();

  useEffect(() => { 
    (async () => {
      const res = await fetch("/api/user/freeGenerations");
      const { freeGenerations } = await res.json() as {freeGenerations: number};
      if (freeGenerations !== undefined){
        useUserSettingsStore.getState().setFreeGenerations(freeGenerations);
      }
    })();
  }, [imageResponse?.imageUrl]);

  return <div className="flex py-[10vh] my-12 justify-center items-center">
    <div className="relative flex flex-col gap-3 justify-center w-[80vw] sm:w-[512px]">

      <SessionProvider>
        <AboveInputLogin />
      </SessionProvider>
      
      <GeneratePromptInput 
        defaultPrompt={defaultPrompt} 
        loading={loading} 
        generateImage={function (prompt: string): void {
          generateImage(modelDetails, prompt);
        } } >

        <AdvancedModelSelection modelDetails={modelDetails} setModelDetails={setModelDetails} />
      </GeneratePromptInput>

      {imageResponse && <Link 
        href={"/img/" + imageResponse.imageId}
        className="flex flex-col gap-2 group cursor-pointer ">
        <Image src={imageResponse.imageUrl} width={1024} height={1024} alt={imageResponse.prompt} className="rounded-md w-3/5 mx-auto" />
        <div className="text-sm break-words bg-neutral-200/60 p-3 rounded-md">{imageResponse.prompt}</div>
      </Link>}
    </div>
  </div>;
}