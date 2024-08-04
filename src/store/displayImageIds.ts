
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type QueryDetails = {
  type: "recent";
} | {
  type: "search";
  prompt: string;
};

export type QueryType = QueryDetails["type"];

interface DisplayImageIdsStore {
  imageIds?: string[];
  setImageIds(imageIds: string[] | undefined): void;

  queryType: QueryDetails;
  setQueryType(queryType: QueryDetails): void;
}

export const useDisplayImageIdsStore = create<DisplayImageIdsStore>()(immer((set) => ({
  imageIds: undefined,
  setImageIds: (imageIds: string[]) => set((state) => {
    state.imageIds = imageIds;
  }),

  queryType: {
    type: "recent",
  },
  setQueryType: (queryType: QueryDetails) => set((state) => {
    state.queryType = queryType;
  }),
})));
