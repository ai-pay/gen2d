import { DisplayImages } from "@/components/displayImages";
import { GenerationInput } from "@/components/generationInput";
import { MainHeader } from "@/components/header";

export default function Home({
  searchParams
} : {
  searchParams: { [key: string]: string }
}) {
  return <>
    <MainHeader />
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GenerationInput defaultModelDetails={searchParams["modelDetails"]} defaultPrompt={searchParams["prompt"]} />
      <DisplayImages />
    </main>
  </>;
}
