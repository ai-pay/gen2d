"use client";

import { GenerationsRequest } from "@/services/useGenerateImage";
import Image from "next/image";
import Link from "next/link";

export function DisplayGenerations({
  generations,
}: {
  generations: GenerationsRequest[];
}) {
  if (generations.length === 0) {
    return null;
  }

  return <div
    className="px-4 sm:px-24 md:px-36 lg:56 container"
  >
    <div
      className="w-full overflow-x-scroll rounded-md bg-neutral-200/25 p-3">

      <div
        className="flex flex-row w-fit gap-3">

        {generations.map((generation) => {
          if (generation.response.type === "error") {
            return <div
              key={generation.key}
              className="h-[30vh] w-[30vh] min-w-[30vh] bg-red-200/60 rounded-md flex justify-center items-center overflow-y-scroll"
            >
              <div
                className="text-sm break-words p-3">
                Error generating image: {generation.response.error}
              </div>
            </div>;
          }

          if (generation.response.type === "pending") {
            return <div
              key={generation.key}
              className="h-[30vh] w-[30vh] min-w-[30vh] bg-neutral-200/60 rounded-md flex justify-center items-center"
            >
              <div
                className="text-sm break-words p-3">Loading...</div>
            </div>;
          }

          return <Link
            key={generation.key}
            href={"/img/" + generation.response.imageId}
            className="h-[30vh] w-[30vh] min-w-[30vh] relative rounded-md"
          >
            <Image
              src={generation.response.imageUrl}
              width={1024}
              height={1024}
              alt={generation.request.prompt}
              className="rounded-md max-h-full max-w-full mx-auto" />
            <div
              className="absolute bottom-0 left-0 right-0 text-sm break-words p-3 rounded-md">{generation.request.prompt}</div>
          </Link>;
        })}
      </div>
    </div>
  </div>;
}
