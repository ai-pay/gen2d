"use client";

import { useRef, useState } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { useSearchParams } from "next/navigation";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import { AdvancedModelSelection } from "./advancedFeaturesInput";
import { GenerateImageRequest } from "@/types/generateImageRequest";
import { useGenerateImage } from "@/services/useGenerateImage";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

function DarkIconButton({
  children,
  loading,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  loading: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return <button
    className={`
    text-neutral-100
    w-10 h-10
    flex items-center justify-around
    rounded-md
    hover:bg-neutral-700 transition-colors
    ${loading ? "bg-neutral-700 cursor-not-allowed animate-pulse" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    `}
    onClick={() => {
      if (loading || disabled) return;
      onClick();
    }}
  >
    {children}
  </button>;
}

export function GenerationInput() {
  const searchParams = useSearchParams();

  const ref = useRef<HTMLTextAreaElement>(null);
  // const [ minFoundHeight, setMinFoundHeight ] = useState(1000);
  // const [ isMultiline, setIsMultiline ] = useState(false);

  const defaultModelDetails = searchParams.get("modelDetails");
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

  return <div className="flex py-[10vh] my-12 justify-center items-center">
    <Toaster />
    <div className="relative flex flex-col gap-3 justify-center w-[80vw] sm:w-[512px]">
      <div className="absolute top-0 -translate-y-full z-10 flex flex-row gap-1.5 items-center m-auto  divide-zinc-600 bg-neutral-900 shadow-md shadow-black/40 rounded-md pl-2 pr-1.5 py-0.5
        w-[80vw] sm:w-[512px]">
        <label htmlFor="textarea-input" className=" sr-only">Prompt</label>
        <TextareaAutosize 
          // onResize={() => {
          //   if (ref.current && minFoundHeight > ref.current.clientHeight) {
          //     setMinFoundHeight(ref.current.clientHeight);
          //     setIsMultiline(false);
          //   } else if (ref.current) {
          //     setIsMultiline(ref.current.clientHeight > minFoundHeight);
          //   }
          // }}
          defaultValue={searchParams.get("prompt") || ""}
          rows={1}
          maxRows={4}
          className="flex-grow disabled:opacity-80 text-white text-sm bg-transparent border-0 shadow-none resize-none outline-none ring-0 disabled:bg-transparent placeholder:text-zinc-400 [scroll-padding-block:0.75rem] pr-2 leading-relaxed py-3 pl-1 [&_textarea]:px-0"
          placeholder="Enter your prompt here..."
          autoFocus
          ref={ref} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}      
        />

        <DarkIconButton
          loading={loading}
          onClick={() => {
            generateImage(modelDetails, ref.current?.value || "");
          }}
        >
          <SparklesIcon className="h-5 w-5" />
        </DarkIconButton>

        <DarkIconButton
          loading={false}
          onClick={() => {
            console.log({ modelDetails, prompt: ref.current?.value || "" });
            generateImage(modelDetails, ref.current?.value || "");
          }}
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </DarkIconButton>
      </div>
      <AdvancedModelSelection modelDetails={modelDetails} setModelDetails={setModelDetails} />

      {imageResponse && <Link 
        href={"/img/" + imageResponse.imageId}
        className="flex flex-col gap-2 group cursor-pointer ">
        <Image src={imageResponse.imageUrl} width={1024} height={1024} alt={imageResponse.prompt} className="rounded-md w-3/5 mx-auto" />
        <div className="text-sm break-words bg-neutral-200/60 p-3 rounded-md">{imageResponse.prompt}</div>
      </Link>}
    </div>
  </div>;
}