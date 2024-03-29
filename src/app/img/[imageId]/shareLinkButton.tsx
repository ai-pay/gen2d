"use client";

import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import {
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  WorkplaceIcon,
  XIcon,
} from "react-share";
import { useMemo } from "react";
import { IconButtonStyles } from "./iconStyles";

export function ShareLinkButton({
  imageId,
} : {
  imageId: string;
}) {

  const pageUrl = "https://www.gen2d.dev/img/" + imageId;

  const ShareButtons = useMemo<JSX.Element[]>(() => [
    <FacebookShareButton key="2" className="bg-red-500" url={pageUrl}>
      <div className="flex gap-2 items-center">
        <FacebookIcon size={32} round /> Facebook
      </div>
    </FacebookShareButton>,
    // <FacebookMessengerShareButton appId="" key="3" url={pageUrl}>
    //   <FacebookMessengerIcon size={32} round />
    // </FacebookMessengerShareButton>,
    <LineShareButton key="7" url={pageUrl}>
      <div className="flex gap-2 items-center">
        <LineIcon size={32} round /> Line
      </div>
    </LineShareButton>,
    <LinkedinShareButton key="8" url={pageUrl}>
      <div className="flex gap-2 items-center">
        <LinkedinIcon size={32} round /> LinkedIn
      </div>
    </LinkedinShareButton>,
    <TwitterShareButton key="16" url={pageUrl}>
      <div className="flex gap-2 items-center">
        <XIcon size={32} round /> Twitter
      </div>
    </TwitterShareButton>,
    <RedditShareButton key="13" url={pageUrl}>
      <div className="flex gap-2 items-center">
        <RedditIcon size={32} round /> Reddit
      </div>
    </RedditShareButton>,
    <TelegramShareButton key="14" url={pageUrl}>
      <div className="flex gap-2 items-center">
        <TelegramIcon size={32} round /> Telegram
      </div>
    </TelegramShareButton>,
    <WhatsappShareButton key="19" url={pageUrl}>
      <div className="flex gap-2 items-center">
        <WhatsappIcon size={32} round /> WhatsApp
      </div>
    </WhatsappShareButton>,
    <WorkplaceShareButton key="20" url={pageUrl}>
      <div className="flex gap-2 items-center">
        <WorkplaceIcon size={32} round /> Workplace
      </div>
    </WorkplaceShareButton>,
  ], [pageUrl]);

  return <HoverCard openDelay={50}>
    <HoverCardTrigger
      className={IconButtonStyles}
    >
      <ShareIcon className="w-5 h-5" />
    </HoverCardTrigger>
    <HoverCardContent>
      <ScrollArea className="h-72 rounded-md">
        <div className="flex flex-col items-stretch gap-2">
          <h4 className="text-sm font-bold leading-none">Share</h4>
          {ShareButtons.map((button) => (
            <>
              <Separator />
              {button}
            </>
          ))}
        </div>
      </ScrollArea>
    </HoverCardContent>
  </HoverCard>;
}
  