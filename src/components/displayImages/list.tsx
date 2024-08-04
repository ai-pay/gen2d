"use client";

import { DisplayImage } from "./displayImage";
import { SimulatedImageBuffering } from "./simulatedImageBuffering";
import { useDisplayImageIdsStore } from "@/store/displayImageIds";

export function DisplayImagesList({
  initialImageIds,
}: {
  initialImageIds: string[];
}) {
  const searching = useDisplayImageIdsStore((state) => state.queryType.type === "search");
  const clientImageIds = useDisplayImageIdsStore((state) => state.imageIds) ?? initialImageIds;
  const imageIds = clientImageIds ?? initialImageIds;

  if ((searching && clientImageIds === undefined) || imageIds === undefined) {
    return <ul
      className="grid grid-cols-[repeat(auto-fit,_minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(175px,1fr))] w-full mx-auto gap-4">
      {Array.from({
        length: 30,
      }).map((_, index) => (
        <li
          key={index}
          className="space-y-4 w-full">
          <DisplayImage
            text="Loading ..." />
        </li>
      ))}
    </ul>;
  }

  if (imageIds.length < 25) {
    return <ul
      className="grid grid-cols-[repeat(auto-fit,_minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(175px,1fr))] w-full mx-auto gap-4">
      {imageIds.map((imageId) => (
        <li
          key={imageId}
          className="space-y-4 w-full">
          <DisplayImage
            imageId={imageId} />
        </li>
      ))}
      {Array.from({
        length: 25 - imageIds.length,
      }).map((_, index) => (
        <li
          key={index}
          className="space-y-4 w-full">
          <DisplayImage
            text="placeholder" />
        </li>
      ))}
    </ul>;
  }

  return <SimulatedImageBuffering
    imageIds={imageIds} />;
}
