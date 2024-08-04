import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "./clientConfig";

export const app = initializeApp(firebaseConfig);
export const auth = typeof window !== "undefined" && getAuth(app);
export const db = typeof window !== "undefined" && getFirestore(app);

export const analytics = typeof window !== "undefined" && getAnalytics(app);

export const perf = typeof window !== "undefined" && getPerformance(app);
