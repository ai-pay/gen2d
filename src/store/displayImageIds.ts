
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type QueryDetails = {
    type: "recent" | "popular";
  } | {
    type: "prompt";
    prompt: string;
  };

export type QueryType = QueryDetails["type"];

interface DisplayImageIdsStore {
  loadingImageIds: boolean;
  setLoadingImageIds(loadingImageIds: boolean): void;

  imageIds?: string[];
  setImageIds(imageIds: string[] | undefined): void;
  
  queryType: QueryDetails;
    setQueryType(queryType: QueryDetails): void;
}

export const useDisplayImageIdsStore = create<DisplayImageIdsStore>()(immer((set) => ({
  loadingImageIds: false,
  setLoadingImageIds: (loadingImageIds: boolean) => set((state) => {
    state.loadingImageIds = loadingImageIds;
  }),

  imageIds: undefined,
  setImageIds: (imageIds: string[]) => set((state) => {
    state.imageIds = imageIds;
  }),
    
  queryType: { type: "recent" },
  setQueryType: (queryType: QueryDetails) => set((state) => {
    if (state.loadingImageIds) return;
    state.queryType = queryType;
  }),
})));
