"use client";

import { DisplayImagesHeader } from "./header";
import { DisplayImagesList } from "./list";
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";



const queryClient = new QueryClient();

export function DisplayImages({initialImageIds}: {initialImageIds: string[]}) {

  return <div className="flex flex-col gap-3 px-4 sm:px-24 md:px-36 lg:56 pb-20 container">
    <QueryClientProvider client={queryClient}>
      <DisplayImagesHeader 
        initialImageIds={initialImageIds}
      />
    </QueryClientProvider>
    <DisplayImagesList />
  </div>;
}
