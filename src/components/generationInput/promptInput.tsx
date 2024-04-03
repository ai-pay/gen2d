"use client";

import TextareaAutosize from "react-textarea-autosize";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSessionData } from "ai-pay-react-hooks";
import { AiPayPrompts } from "./aiPayPrompts";
import toast from "react-hot-toast";
import { useDisplayImageIdsStore } from "@/store/displayImageIds";
import { useUserSettingsStore } from "@/store/userSettings";

function DarkIconButton({
  children,
  loading,
  disabled,
  tooltip,
  onClick,
}: {
    children: React.ReactNode;
    loading: boolean;
    disabled?: boolean;
    tooltip: React.ReactNode;
    onClick: () => void;
}) {
  return <TooltipProvider delayDuration={50}>
    <Tooltip>
      <TooltipTrigger 
        className={`
        relative
        text-neutral-100
        w-10 h-10
        flex items-center justify-around
        rounded-md
        hover:bg-neutral-700 transition-colors
        ${loading ? "bg-neutral-700 cursor-not-allowed animate-pulse" : ""}
        ${disabled ? "cursor-not-allowed bg-neutral-700/50 text-neutral-100/50" : "cursor-pointer"}
        `}
        onClick={() => {
          if (loading || disabled) return;
          onClick();
        }}>
        {children}   
      </TooltipTrigger>
      <TooltipContent>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>;  
}

export function GeneratePromptInput({
  defaultPrompt,
  loading,
  generateImage,
  children,
}: {
    defaultPrompt: string | undefined;
    loading: boolean;
    generateImage: (prompt: string) => void;
    children: React.ReactNode;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const freeGenerations = useUserSettingsStore((state) => state.freeGenerations ?? 0);

  const setQuery = useDisplayImageIdsStore((state) => state.setQueryType);

  const {
    browserExtensionInstalled,
    sessionState,
  } = useSessionData();
    
  return <>
    {!!freeGenerations && <div className="flex flex-col text-neutral-800 mx-auto text-sm">
      {freeGenerations} free generation{freeGenerations === 1 ? "" : "s"} remaining
    </div>}
    <div className="z-10 flex flex-row gap-1.5 items-center m-auto divide-zinc-600 bg-neutral-900 shadow-md shadow-black/40 rounded-md pl-2 pr-1.5 py-0.5
    w-[80vw] sm:w-[512px]">

      <label htmlFor="textarea-input" className=" sr-only">Prompt</label>
      <TextareaAutosize
        defaultValue={defaultPrompt || ""}
        rows={1}
        maxRows={4}
        className="flex-grow disabled:opacity-80 text-white text-sm bg-transparent border-0 shadow-none resize-none outline-none ring-0 disabled:bg-transparent placeholder:text-zinc-400 [scroll-padding-block:0.75rem] pr-2 leading-relaxed py-3 pl-1 [&_textarea]:px-0"
        placeholder="Enter your prompt here..."
        autoFocus
        ref={ref} 
      />

      <DarkIconButton
        loading={loading}
        disabled={sessionState !== "ACTIVE" && freeGenerations <= 0}
        tooltip={sessionState !== "ACTIVE" ? (
          <p className="w-[200px] text-neutral-600 text-sm">
            Generating images requires an AI Pay session. {!browserExtensionInstalled ? <>
              <a 
                href="https://chromewebstore.google.com/detail/ai-pay/igghgdjfklipjmgldcdfnpppgaijmhfg" 
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download AI Pay and automatically receive 40 free credits
              </a>.
            </> : <>
              Start a session using the AI Pay browser extension. <a 
                href="https://www.joinaipay.com/welcome" 
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn how to start a session
              </a>.
            </>}
          </p>
        ) : "Generate image"}
        onClick={() => {
          generateImage(ref.current?.value || "");
        }}
      >
        <SparklesIcon className="h-5 w-5" />
      </DarkIconButton>

      <DarkIconButton
        loading={false}
        tooltip="Search for similar prompts"
        onClick={() => {
          const text = ref.current?.value || "";
          if (text === "") {
            toast.error("Please enter a prompt to search for.");
            return;
          }

          setQuery({
            type: "prompt",
            prompt: text,
          });
        }}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </DarkIconButton>
    </div>
    {!freeGenerations && <AiPayPrompts 
      browserExtensionInstalled={browserExtensionInstalled} 
      sessionState={sessionState} />
    }
    {(!!freeGenerations || sessionState === "ACTIVE") && children }
  </>;
}