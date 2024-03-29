"use client";

import { useGenerations } from "../../services/useGenerations";
import { DisplayImagesHeader } from "./header";
import { DisplayImagesList } from "./list";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

export const imageDisplayOptions = [
  "Recent Generations",
] as const; 

export type ImageDisplayOption = typeof imageDisplayOptions[number];

export function DisplayImagesContent({initialImageIds}: {initialImageIds: string[]}) {
  const {imageIds, reloadImages} = useGenerations(initialImageIds);

  return <div className="flex flex-col gap-3 px-4 sm:px-24 md:px-36 lg:56 pb-20 container">
    <DisplayImagesHeader 
      defaultValue={imageDisplayOptions[0]}
      onValueChange={console.log}
      refreshImages={reloadImages}
    />
    <DisplayImagesList imageIds={imageIds} />
  </div>;
}

const queryClient = new QueryClient();

export function DisplayImages({initialImageIds}: {initialImageIds: string[]}) {

  return <QueryClientProvider client={queryClient}>
    <DisplayImagesContent initialImageIds={initialImageIds} />
  </QueryClientProvider>;
}