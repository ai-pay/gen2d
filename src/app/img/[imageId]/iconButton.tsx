"use client";

import { IconButtonStyles } from "./iconStyles";
import { Tooltip } from "@nextui-org/react";

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

  return <Tooltip
    content={tooltip}>
    <button
      className={IconButtonStyles}
      onClick={onClick}
    >{children}</button>
  </Tooltip>;
}
