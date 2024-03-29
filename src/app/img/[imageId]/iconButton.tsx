"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconButtonStyles } from "./iconStyles";

export function IconButton({
  children,
  tooltip,
  onClick,
}: {
    children: React.ReactNode;
    tooltip?: string;
    onClick: () => void;
  }) {
  if (!tooltip) {
    return <button 
      className={IconButtonStyles}
      onClick={onClick}
    >{children}</button>;
  }
  return <TooltipProvider delayDuration={50}>
    <Tooltip>
      <TooltipTrigger
        className={IconButtonStyles}
        onClick={onClick}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>;
}
  