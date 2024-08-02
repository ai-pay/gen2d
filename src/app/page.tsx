"use server";

import { DisplayImages } from "../components/displayImages";
import { GenerationInput } from "../components/generationInput";
import { MainHeader } from "../components/header";
import { fetchRecentImageIds } from "../database/redis/recentImageIds/fetchRecentImageIds";

export default async function Home({
  searchParams
} : {
  searchParams: { [key: string]: string }
}) {
  const initialImageIds = await fetchRecentImageIds();

  return <>
    <Head>
      <link
        rel="canonical"
        href="https://www.gen2d.dev" />
    </Head>
    <MainHeader />
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GenerationInput defaultModelDetails={searchParams["modelDetails"]} defaultPrompt={searchParams["prompt"]} />
      <DisplayImages initialImageIds={initialImageIds} />
    </main>
  </>;
}
