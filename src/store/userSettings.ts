
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UserSettingsStore {
  profileImageId?: string;
  setProfileImageId(profileImageId: string): void;

  userImageIds: string[];
  setUserImageIds(imageIds: string[]): void;

  freeGenerations: number | undefined;
  setFreeGenerations(freeGenerations: number): void;
}

export const useUserSettingsStore = create<UserSettingsStore>()(immer((set) => ({
  profileImageId: undefined,
  setProfileImageId: (profileImageId: string) => set((state) => {
    state.profileImageId = profileImageId === "" ? undefined : profileImageId;
  }),
  
  userImageIds: [],
  setUserImageIds: (imageIds: string[]) => set((state) => {
    state.userImageIds = imageIds;
  }),

  freeGenerations: undefined,
  setFreeGenerations: (freeGenerations: number) => set((state) => {
    state.freeGenerations = freeGenerations;
  }),
})));
