import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GEN2D - Generate images from text using AI",
  description: "GEN2D allows you to generate images using AI. The images are then hosted online for you to share with others or display on your own website or application.",
  other: {
    "ai-pay-website-identifier": "{\"websiteId\":\"aMmPrsrGkPI50yYOXV6X\",\"websiteName\":\"GEN2D\",\"websiteDescription\":\"GEN2D allows you to generate images using AI. The images are then hosted online for you to share with others or display on your own website or application\",\"recommendedCredit\":10,\"requestUsageOnPageLoad\":false}",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-neutral-50")}>{children}</body>
    </html>
  );
}
