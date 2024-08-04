"use client";

import { getCreditInfo } from "@/database/aiPay/getCreditInfo";
import { useEffect } from "react";
import { useUserSettingsStore } from "./userSettings";

export function useInitialiseStores(uid: string | undefined) {
  useEffect(() => {
    useUserSettingsStore.getState().setUid(uid);

    (async () => {
      if (uid) {
        useUserSettingsStore.getState().setAiPayCreditsRemaining({
          state: "loading",
        });

        const creditInfo = await getCreditInfo();

        console.log(creditInfo);

        if (!creditInfo.success) {
          useUserSettingsStore.getState().setAiPayCreditsRemaining({
            state: "error",
            message: creditInfo.error,
          });
          return;
        }

        if (!creditInfo.data.success) {
          useUserSettingsStore.getState().setAiPayCreditsRemaining({
            state: "error",
            message: "Failed to get credit info",
          });
          return;
        }

        if (!creditInfo.data.access) {
          useUserSettingsStore.getState().setAiPayCreditsRemaining({
            state: "no access",
          });
          return;
        }

        useUserSettingsStore.getState().setAiPayCreditsRemaining({
          state: "success",
          credits: creditInfo.data.creditLimit - (creditInfo.data.creditsUsed ?? 0),
        });
      }
    })();
  }, [uid]);
}
