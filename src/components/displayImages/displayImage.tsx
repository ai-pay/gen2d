import { Skeleton } from "@nextui-org/react";
import { cn } from "../../utils/cn";
import { generateImageUrl } from "../../database/cloudflare/generateImageUrl";
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
