import { Skeleton } from "@/components/ui/skeleton";
import { generateImageUrl } from "@/database/cloudflare/generateImageUrl";
import { cn } from "@/lib/utils";
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
    href={imageId ? `/images/${imageId}` : "/"}
  >
    <div className={cn(
      "relative aspect-square rounded-lg",
      imageId ? "transition duration-500 hover:scale-110 cursor-pointer" : "",
    )}>
      <Skeleton className="absolute inset-0" />
      {imageId && <Image 
        alt={`Generated image for id: ${imageId}`}
        src={generateImageUrl(imageId, "256")}
      />}

      {text && <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
        {text}
      </div>}
    </div>
  </Link>;
}

export function DisplayImagesList({
  imageIds,
}: {
  imageIds: string[] | undefined;
}) {

  if (imageIds === undefined) {
    return <ul className="grid grid-cols-[repeat(auto-fit,_minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(175px,1fr))] w-full mx-auto gap-4">
      {Array.from({length: 30}).map((_, index) => (
        <li key={index} className="space-y-4 w-full">
          <DisplayImage text="Loading ..." />
        </li>
      ))}
    </ul>;
  }

  return <ul className="grid grid-cols-[repeat(auto-fit,_minmax(140px,1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(175px,1fr))] w-full mx-auto gap-4">
    {imageIds.map((imageId) => (
      <li key={imageId} className="space-y-4 w-full">
        <DisplayImage imageId={imageId} />
      </li>
    ))}
    {imageIds.length < 50 && Array.from({length: 30 - imageIds.length}).map((_, index) => (
      <li key={index} className="space-y-4 w-full">
        <DisplayImage text="placeholder" />
      </li>
    ))}
  </ul>;
}