"use server";
import "server-only";
import { checkAccess } from "ai-pay";
import { getFirebaseServerDecodedToken } from "@/utils/firebase/getServerToken";

export async function getCreditInfo() {
  "use server";
  const decodedToken = await getFirebaseServerDecodedToken();
  const uid = decodedToken?.uid;

  if (!uid) {
    return {
      success: false,
      error: "Not authenticated",
    } as const;
  }

  return {
    success: true,
    data: await checkAccess(process.env.AI_PAY_API_KEY as string, {
      userId: uid,
      waitForUsageUsed: true,
    }),
  } as const;
}
