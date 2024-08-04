"use client";

import { Button } from "@nextui-org/react";
import {
  Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger
} from "../ui/sheet";
import { generateImageUrl } from "@/database/cloudflare/generateImageUrl";
import { useUserDetails } from "../../services/useUserDetails";
import { useUserSettingsStore } from "@/store/userSettings";
import Image from "next/image";
import Link from "next/link";
import UserIcon from "@heroicons/react/24/outline/UserIcon";

export function ProfileDetails() {
  const user = useUserDetails();

  const profileImageId = useUserSettingsStore((state) => state.profileImageId);

  const recentImageIds = user?.imageIds?.toReversed();

  return <Sheet>
    <Button
      variant="flat"
      isIconOnly
      as={SheetTrigger}>
      {profileImageId ? (
        <Image
          className="w-full h-full"
          width={64}
          height={64}
          src={generateImageUrl(profileImageId, "64")}
          alt="Profile Icon"
        />
      ) : (
        <UserIcon
          className="w-5 h-5" />
      )}
    </Button>
    <SheetContent
      className="w-[400px] sm:w-[540px] h-full">
      <div
        className="overflow-scroll max-h-full grid gap-3 pt-3">
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

        <div
          className="grid grid-cols-2 gap-3">
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
