
import Image from "next/image";
import DocumentDuplicateIcon from "@heroicons/react/24/outline/DocumentDuplicateIcon";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";
import { Metadata } from "next";
import { fetchImageDetails } from "../../../database/redis/imageDetails/fetchImageDetails";
import { generateImageUrl, imageSizeVariants } from "../../../database/cloudflare/generateImageUrl";
import { MainHeader } from "../../../components/header";


export async function generateMetadata({ params }: { params: { imageId: string } }): Promise<Metadata> {

  const imageDetails = await fetchImageDetails(params.imageId);
 
  return {
    title: "Image Details",
    description: `AI Generated Image, Prompt: ${imageDetails.prompt}`,
    // TOOD: Add image for when you send the link to social media
  };
}

export default async function Home({ params }: { params: { imageId: string } }) {
  const imageUrl = generateImageUrl(params.imageId, "1024");
  const imageDetails = await fetchImageDetails(params.imageId);

  return <>
    <MainHeader />
    <main className="flex min-h-screen flex-col items-center justify-between container pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
        <div className="relative flex flex-col gap-3 aspect-square bg-neutral-200/60 p-3 rounded-md overflow-y-scroll">
          <div className="sticky top-0 flex flex-row justify-end gap-3">
            <a href={`/?prompt=${imageDetails.prompt}&modelDetails=${JSON.stringify(imageDetails.modelDetails)}`} 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
              bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-800/80 text-neutral-500 hover:text-neutral-950
              h-10 w-10 outline outline-1 outline-neutral-500/50"
            >
              <DocumentDuplicateIcon className="w-5 h-5" />
            </a>

            <a href={`/?prompt=${imageDetails.prompt}&modelDetails=${JSON.stringify(imageDetails.modelDetails)}`} 
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
              bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-800/80 text-neutral-500 hover:text-neutral-950
              h-10 w-10 outline outline-1 outline-neutral-500/50"
            >
              <ShareIcon className="w-5 h-5" />
            </a>
          </div>

          <h2 className="text-lg font-bold">Prompt:</h2>
          <h1 className="text-base font-bold text-wrap break-words bg-neutral-200 p-3 rounded-md">{imageDetails.prompt}</h1>

          <h2 className="text-lg font-bold pt-5">Model Details:</h2>
          <div className="flex flex-col text-base font-bold text-wrap break-words bg-neutral-200 p-3 rounded-md">
            {Object.entries(imageDetails.modelDetails).sort().map(([key, value]) => {
              return <div key={key}>{key}: {value}</div>;
            })}
          </div>

          <h2 className="text-lg font-bold pt-5">Image variants:</h2>
          {imageSizeVariants.map((variant) => {
            return <div key={variant} className="flex flex-col text-sm font-bold text-wrap break-words bg-neutral-200 p-3 rounded-md">
              <div>{generateImageUrl(params.imageId, variant)}</div>
            </div>;
          })}
        </div>
        <Image className="rounded-md" width={1024} height={1024} src={imageUrl} alt={imageDetails.prompt} />
      </div>
    </main>
  </>;
}
