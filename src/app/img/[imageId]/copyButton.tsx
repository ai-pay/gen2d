"use client";

import CopyIcon from "@heroicons/react/24/outline/ClipboardDocumentIcon";
import copy from "copy-to-clipboard";

import { IconButton } from "./iconButton";
import toast from "react-hot-toast";

export function CopyButton({
  copyText
}: {
  copyText: string;
}) {
  return <IconButton 
    onClick={function (): void {
      toast.success("Copied to clipboard");
      copy(copyText);
    } }>
    <CopyIcon className="w-5 h-5" />
  </IconButton>;
}
  