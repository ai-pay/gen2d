"use client";

import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { useUserDetails } from "../../services/useUserDetails";
import { SheetTrigger, SheetContent, SheetTitle, SheetDescription, Sheet } from "../ui/sheet";
import Link from "next/link";
import { generateImageUrl } from "@/database/cloudflare/generateImageUrl";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "react-query";
import { useUserSettingsStore } from "@/store/userSettings";

function ProfileDetailsContents() {
  const user = useUserDetails();

  const profileImageId = useUserSettingsStore((state) => state.profileImageId);

  const recentImageIds = user?.imageIds?.toReversed();

  return <Sheet>
    <SheetTrigger className="
  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
  bg-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-800/80 text-neutral-500 hover:text-neutral-950
  h-10 w-10 overflow-hidden
  ">
      {profileImageId ? (
        <Image 
          className="w-full h-full" width={64} height={64} 
          src={generateImageUrl(profileImageId, "64")} 
          alt="Profile Icon"
        />
      ) : (
        <UserIcon className="w-5 h-5" />
      )}
    </SheetTrigger>
    <SheetContent className="w-[400px] sm:w-[540px] h-full">
      <div className="overflow-scroll max-h-full grid gap-3 pt-3">
        <Button variant="default"
          onClick={() => {
            if (user.status === "authenticated") {
              signOut();
            } else {
              signIn();
            }
          }}
        >
          {user.status === "authenticated" ? "Logout" : "Sign Up"}
        </Button>

        {profileImageId && <>
          <SheetTitle>Profile Icon</SheetTitle>
          <Link 
            href={`/img/${profileImageId}`}
            className="overflow-hidden rounded-md"
          >
            <Image 
              src={generateImageUrl(profileImageId, "512")} 
              alt="Profile Icon"
              width={512}
              height={512}
            />
          </Link>
        </>}
      
        <SheetTitle>Recently Generated Images</SheetTitle>

        <div className="grid grid-cols-2 gap-3">
          {recentImageIds && !!recentImageIds.length && recentImageIds.map((imageId) => (
            <Link 
              key={imageId}
              href={`/img/${imageId}`}
              className="overflow-hidden rounded-md"
            >
              <Image 
                src={generateImageUrl(imageId, "256")} 
                alt="Profile Icon"
                width={512}
                height={512}
              />
            </Link>
          ))}

          {recentImageIds && !recentImageIds.length && (
            <SheetDescription>
              You haven&apos;t generated any images yet.
            </SheetDescription> 
          )}


          {user && !recentImageIds && (
            <SheetDescription>
              Loading...
            </SheetDescription>
          )}



          {!user && (
            <SheetDescription>
              You must be logged in to view your recently generated images.
            </SheetDescription>
          )}
        </div>
      </div>
    </SheetContent>
  </Sheet>;
}

const queryClient = new QueryClient();


export function ProfileDetails() {

  return <QueryClientProvider client={queryClient}>
    <ProfileDetailsContents />
  </QueryClientProvider>;
  
}