
import { SimulatedImageBuffering } from "./simulatedImageBuffering";
import { Skeleton } from "@nextui-org/react";
import { cn } from "../../utils/cn";
import { generateImageUrl } from "../../database/cloudflare/generateImageUrl";
import { useDisplayImageIdsStore } from "@/store/displayImageIds";
import Image from "next/image";
import Link from "next/link";

export function DisplayImage({
  imageId,
  text,
}: {
  imageId?: string;
  text?: string;
}) {
  return <Link
    href={imageId ? `/img/${imageId}` : "/"}
  >
    <div
      className={cn(
        "relative aspect-square rounded-lg overflow-hidden bg-neutral-200 shadow-md",
        imageId ? "transition duration-500 hover:scale-110 cursor-pointer" : "",
      )}>
      <Skeleton
        className="absolute inset-0 -z-10" />
      {imageId && <Image
        className="w-full h-full"
        width={256}
        height={256}
        alt={`Generated image for id: ${imageId}`}
        src={generateImageUrl(imageId, "256")}
        unoptimized
      />}

      {text && <div
        className="absolute inset-0 flex items-center justify-center text-neutral-500">
        {text}
      </div>}
    </div>
  </Link>;
}

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
