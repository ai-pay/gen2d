import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { cn } from "../utils/cn";
import { getFirebaseServerDecodedToken } from "@/utils/firebase/getServerToken";
import type { Metadata } from "next";

// eslint-disable-next-line new-cap
const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GEN2D - Generate AI Images",
  description: "GEN2D allows you to generate images using AI. The images are then hosted online for you to share with others or display on your own website or application.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const decodedToken = await getFirebaseServerDecodedToken();

  return (
    <html
      lang="en">
      <body
        className={cn(inter.className, "bg-neutral-50")}>
        <Providers
          uid={decodedToken?.uid}>
          {children}
        </Providers>
      </body>
      <Analytics />
    </html>
  );
}
