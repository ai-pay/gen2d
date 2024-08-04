import { getCreditInfo } from "@/database/aiPay/getCreditInfo";
import { useUserSettingsStore } from "@/store/userSettings";

export async function reloadCreditsRemaining() {
  const creditInfo = await getCreditInfo();

  if (creditInfo.success && creditInfo.data.success && creditInfo.data.access) {
    useUserSettingsStore.getState().setAiPayCreditsRemaining({
      state: "success",
      credits: creditInfo.data.creditLimit - (creditInfo.data.creditsUsed ?? 0),
    });
  }
}
