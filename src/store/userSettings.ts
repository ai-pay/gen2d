
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type AiPayCreditsRemaining = {
  state: "idle"
} | {
  state: "loading"
} | {
  state: "success"
  credits: number
} | {
  state: "no access"
} | {
  state: "error"
  message: string
}

interface UserSettingsStore {
  uid?: string;
  setUid: (uid: string | undefined) => void;

  profileImageId?: string;
  setProfileImageId(profileImageId: string): void;

  userImageIds: string[];
  setUserImageIds(imageIds: string[]): void;
  prependUserImageId(imageId: string): void;

  aiPayCreditsRemaining: AiPayCreditsRemaining;
  setAiPayCreditsRemaining(credits: AiPayCreditsRemaining): void;
}

export const useUserSettingsStore = create<UserSettingsStore>()(immer((set) => ({
  uid: undefined,
  setUid: (uid: string | undefined) => set((state) => {
    state.uid = uid;
  }),

  profileImageId: undefined,
  setProfileImageId: (profileImageId: string) => set((state) => {
    state.profileImageId = profileImageId === "" ? undefined : profileImageId;
  }),

  userImageIds: [],
  setUserImageIds: (imageIds: string[]) => set((state) => {
    state.userImageIds = imageIds;
  }),
  prependUserImageId: (imageId: string) => set((state) => {
    state.userImageIds.unshift(imageId);
  }),

  aiPayCreditsRemaining: {
    state: "idle",
  },
  setAiPayCreditsRemaining: (creditsState: AiPayCreditsRemaining) => set((state) => {
    state.aiPayCreditsRemaining = creditsState;
  }),
})));
