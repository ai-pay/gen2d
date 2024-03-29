
import Image from "next/image";
import CloneIcon from "@heroicons/react/24/outline/BeakerIcon";
import LinkExternal from "@heroicons/react/24/outline/ArrowTopRightOnSquareIcon";
import { Metadata } from "next";
import { fetchImageDetails } from "../../../database/redis/imageDetails/fetchImageDetails";
import { generateImageUrl, imageSizeVariants } from "../../../database/cloudflare/generateImageUrl";
import { MainHeader } from "../../../components/header";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconButtonStyles } from "./iconStyles";
import { CopyButton } from "./copyButton";
import { SetProfileIconIdButton } from "./setProfileIconIdButton";
import { ShareLinkButton } from "./shareLinkButton";
import { redirect } from "next/navigation";

function IconLink({
  children,
  tooltip,
  href,
  external = false,
}: {
  children: React.ReactNode;
  tooltip?: string;
  href: string;
  external?: boolean;
}) {
  if (!tooltip) {
    return <Link 
      className={IconButtonStyles} 
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >{children}</Link>;
  }
  return <TooltipProvider delayDuration={50}>
    <Tooltip>
      <TooltipTrigger>
        <Link 
          className={IconButtonStyles} 
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >{children}</Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>;
}

export async function generateMetadata({ params }: { params: { imageId: string } }): Promise<Metadata> {

  const imageDetails = await fetchImageDetails(params.imageId);
 
  return {
    title: "Image Details",
    description: `AI Generated Image, Prompt: ${imageDetails?.prompt}`,
    openGraph: {
      title: "GEN2D Image",
      description: `GEN2D, Prompt: ${imageDetails?.prompt}`,
      url: `https://www.gen2d.dev/img/${params.imageId}`,
      type: "website",
      siteName: "GEN2D",
      images: [
        {
          url: generateImageUrl(params.imageId, "1024"),
          type: "image/jpeg",
          width: 1024,
          height: 1024,
          alt: imageDetails?.prompt,
        },
      ],
    },
  };
}

export default async function Home({ params }: { params: { imageId: string } }) {
  const imageUrl = generateImageUrl(params.imageId, "1024");
  const imageDetails = await fetchImageDetails(params.imageId);

  if (!imageDetails) {
    redirect("/");
  }

  return <>
    <MainHeader />
    <main className="grid grid-cols-1 sm:grid-cols-2 gap-3 container pb-8">
      <div className="flex flex-col gap-3 my-auto">
        <div className="flex flex-col gap-0">
          <h2 className="text-lg font-bold pt-5">Image variants:</h2>
          <p className="text-sm">(You can put this image anywhere you&apos;d like or put these links in your website)</p>
        </div>
        {imageSizeVariants.map((variant) => {
          return <div key={variant} className="group flex text-sm font-bold text-wrap break-words bg-neutral-200/60 justify-between items-center p-1.5 pl-5 rounded-md">
            <p className="overflow-x-scroll whitespace-nowrap py-2">{generateImageUrl(params.imageId, variant)}</p>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <IconLink href={generateImageUrl(params.imageId, variant)}
              >
                <LinkExternal className="w-5 h-5" />
              </IconLink>
              <CopyButton copyText={generateImageUrl(params.imageId, variant)} />
            </div>
          </div>;
        })}
      </div>
      <Link 
        className="rounded-md m-auto overflow-hidden" 
        href={imageUrl} 
        target="_blank"
        rel="noopener noreferrer">
        <Image 
          width={1024} 
          height={1024} 
          src={imageUrl} 
          alt={imageDetails?.prompt ?? ""} />
      </Link>

      <div className="relative col-span-1 sm:col-span-2 flex flex-col gap-3 bg-neutral-200/60 p-3 pt-9 rounded-md overflow-y-scroll group">
        <div className="absolute top-3 right-3 flex flex-row justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <SetProfileIconIdButton imageId={params.imageId} />

          <IconLink 
            tooltip="Clone the prompt and model details"
            href={`/?prompt=${imageDetails?.prompt ?? ""}&modelDetails=${JSON.stringify(imageDetails?.modelDetails)}`}
          >
            <CloneIcon className="w-5 h-5" />
          </IconLink>

          <ShareLinkButton imageId={params.imageId}/>
        </div>

        <h2 className="text-lg font-bold">Prompt:</h2>
        <h1 className="text-base font-bold text-wrap break-words bg-neutral-200 p-3 rounded-md">{imageDetails?.prompt ?? ""}</h1>

        <h2 className="text-lg font-bold pt-5">Model Details:</h2>
        <div className="flex flex-col text-base font-bold text-wrap break-words bg-neutral-200 p-3 rounded-md">
          {Object.entries(imageDetails?.modelDetails ?? []).sort().map(([key, value]) => {
            return <div key={key}>{key}: {value}</div>;
          })}
        </div>
      </div>
    </main>
  </>;
}
