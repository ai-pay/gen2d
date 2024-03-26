"use client";

import { DisplayImagesHeader } from "./header";
import { useGenerations } from "@/services/useGenerations";
import { DisplayImagesList } from "./list";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";

export const imageDisplayOptions = [
  "Recent Generations",
] as const; 

export type ImageDisplayOption = typeof imageDisplayOptions[number];

export function DisplayImagesContent() {
  // const [displayOption, setDisplayOption] = useState<ImageDisplayOption>(imageDisplayOptions[0]);

  const {imageIds, reloadImages} = useGenerations();

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

export function DisplayImages() {

  return <QueryClientProvider client={queryClient}>
    <DisplayImagesContent />
  </QueryClientProvider>;

}