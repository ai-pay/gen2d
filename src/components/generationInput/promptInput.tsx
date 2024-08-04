"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { useDisplayImageIdsStore } from "@/store/displayImageIds";
import { useRef } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import SparklesIcon from "@heroicons/react/24/outline/SparklesIcon";
import TextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";

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
  return <Tooltip
    content={tooltip}>
    <Button
      className="dark"
      isLoading={loading}
      isDisabled={loading || disabled}
      isIconOnly
      variant="solid"
      onClick={() => {
        if (loading || disabled) return;
        onClick();
      }}
    >
      {children}

    </Button>
  </Tooltip>;
}

export function GeneratePromptInput({
  defaultPrompt,
  loading,
  generateImage,
}: {
  defaultPrompt: string | undefined;
  loading: boolean;
  generateImage: (prompt: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const setQuery = useDisplayImageIdsStore((state) => state.setQueryType);

  return <div
    className="z-10 flex flex-row gap-1.5 items-end m-auto divide-zinc-600 bg-neutral-900 shadow-md shadow-black/40 rounded-md pl-2 pr-1.5 py-0.5
    w-[80vw] sm:w-[512px]">

    <label
      htmlFor="textarea-input"
      className="sr-only">Prompt</label>
    <TextareaAutosize
      defaultValue={defaultPrompt || ""}
      rows={1}
      maxRows={4}
      className="flex-grow disabled:opacity-80 text-white text-sm bg-transparent border-0 shadow-none resize-none outline-none ring-0 disabled:bg-transparent placeholder:text-zinc-400 [scroll-padding-block:0.75rem] pr-2 leading-relaxed py-3 pl-1 [&_textarea]:px-0"
      placeholder="Enter your prompt here..."
      autoFocus
      ref={ref}
    />

    <div
      className="flex flex-row py-1 gap-1.5">
      <DarkIconButton
        loading={loading}
        tooltip={"Generate image"}
        onClick={() => {
          generateImage(ref.current?.value || "");
        }}
      >
        <SparklesIcon
          className="h-5 w-5" />
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
            type: "search",
            prompt: text,
          });
        }}
      >
        <MagnifyingGlassIcon
          className="h-5 w-5" />
      </DarkIconButton>
    </div>
  </div>;
}
