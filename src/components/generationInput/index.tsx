"use client";

import { useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";

import ArrowIcon from "@heroicons/react/24/outline/ArrowUturnRightIcon";
import { AdvancedModelSelection } from "./advancedFeaturesInput";
import { GenerateImageRequest } from "@/types/generateImageRequest";
import { useGenerateImage } from "@/services/useGenerateImage";

export function GenerationInput() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [ minFoundHeight, setMinFoundHeight ] = useState(1000);
  const [ isMultiline, setIsMultiline ] = useState(false);

  const [ modelDetails, setModelDetails ] = useState<GenerateImageRequest["modelDetails"]>({
    model: "dall-e-3",
    quality: "standard",
    style: "vivid"
  });

  const {
    loading,
    error,
    image,
    imagePrompt,
    generateImage,
  } = useGenerateImage();

  return <div className="flex py-[16vh] my-12 justify-center items-center">
    <div className="relative flex justify-center w-[80vw] sm:w-[512px]">
      <div className="absolute top-0 -translate-y-full z-10 flex flex-row items-center m-auto shadow-lg divide-zinc-600 bg-neutral-900 shadow-black/40 rounded-[24px] pl-3 pr-1
      w-[80vw] sm:w-[512px] ">
        <label htmlFor="textarea-input" className=" sr-only">Prompt</label>
        <TextareaAutosize 
          onResize={() => {
            if (ref.current && minFoundHeight > ref.current.clientHeight) {
              setMinFoundHeight(ref.current.clientHeight);
              setIsMultiline(false);
            } else if (ref.current) {
              setIsMultiline(ref.current.clientHeight > minFoundHeight);
            }
          }}
          rows={1}
          maxRows={4}
          className="flex-grow disabled:opacity-80 text-white text-sm bg-transparent border-0 shadow-none resize-none outline-none ring-0 disabled:bg-transparent selection:bg-teal-300 selection:text-black placeholder:text-zinc-400 [scroll-padding-block:0.75rem] pr-2 leading-relaxed py-3 pl-1 [&_textarea]:px-0"
          placeholder="Enter your prompt here..."
          autoFocus
          ref={ref} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}      
        />

        <button
          className={`
          text-neutral-100
          w-10 h-10
          flex items-center justify-around
          ${isMultiline ? "rounded-xl" : "rounded-l-xl rounded-r-[20px]"}
          hover:bg-neutral-700 transition-colors
          `}
          onClick={() => {
            console.log({ modelDetails, prompt: ref.current?.value || "" });
            generateImage(modelDetails, ref.current?.value || "");
          }}
        >
          <ArrowIcon className="h-5 w-5 rotate-180" />
        </button>
      </div>
      <AdvancedModelSelection modelDetails={modelDetails} setModelDetails={setModelDetails} />
    </div>
  </div>;
}