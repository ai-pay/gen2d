import { DisplayImages } from "@/components/displayImages";
import { GenerationInput } from "@/components/generationInput";
import { MainHeader } from "@/components/header";

export default function Home() {
  return <>
    <MainHeader />
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GenerationInput />
      <DisplayImages />
    </main>
  </>;
}
