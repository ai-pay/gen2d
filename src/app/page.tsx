import { DisplayImages } from "@/components/displayImages";
import { GenerationInput } from "@/components/generationInput";
import { MainHeader } from "@/components/header";
import { Metadata } from "next";
import { fetchRecentImageIds } from "@/database/redis/recentImageIds/fetchRecentImageIds";
import { getFirebaseServerDecodedToken } from "@/utils/firebase/getServerToken";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.gen2d.dev",
  },
};

export default async function Home({
  searchParams,
} : {
  searchParams: { [key: string]: string }
}) {
  const decodedToken = await getFirebaseServerDecodedToken();

  const initialImageIds = await fetchRecentImageIds();

  return <>
    <MainHeader />
    <main
      className="flex min-h-screen flex-col items-center justify-between">
      <GenerationInput
        uid={decodedToken?.uid}
        defaultModelDetails={searchParams["modelDetails"]}
        defaultPrompt={searchParams["prompt"]}
      />
      <DisplayImages
        initialImageIds={initialImageIds} />
    </main>
  </>;
}
