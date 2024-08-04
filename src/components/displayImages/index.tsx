"use client";

import { DisplayImagesHeader } from "./header";
import { DisplayImagesList } from "./list";
import { useGenerations } from "@/services/useGenerations";

export function DisplayImages({
  initialImageIds,
}: {initialImageIds: string[]}) {
  const {
    reloadImages,
  } = useGenerations();

  return <div
    className="flex flex-col gap-3 px-4 sm:px-24 md:px-36 pb-20 container">
    <DisplayImagesHeader
      reloadImages={reloadImages} />
    <DisplayImagesList
      initialImageIds={initialImageIds}
    />
  </div>;
}
