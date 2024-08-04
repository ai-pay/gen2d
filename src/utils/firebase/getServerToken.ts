
import { cookies } from "next/headers";
import { firebaseConfig } from "./clientConfig";
import { getTokens } from "next-firebase-auth-edge";

export const firebaseEdgePrivateConfig = {
  apiKey: firebaseConfig.apiKey,
  cookieName: "AuthToken",
  cookieSignatureKeys: [process.env.AUTH_COOKIE_SIGNATURE_KEY_CURRENT!, process.env.AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS!],
  serviceAccount: {
    projectId: firebaseConfig.projectId,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n") as string,
  },
};

export async function getFirebaseServerToken() {
  "use server";

  return getTokens(cookies(), firebaseEdgePrivateConfig);
}

export type FirebaseServerDecodedToken = {
  source_sign_in_provider: string;
  email: string;
  picture: string;
  uid: string;
};

export async function getFirebaseServerDecodedToken() {
  "use server";
  const token = await getFirebaseServerToken();

  return token?.decodedToken as undefined | FirebaseServerDecodedToken;
}
