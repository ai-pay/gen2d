"use client";

import ProfileIcon from "@heroicons/react/24/outline/UserIcon";
import { IconButton } from "./iconButton";
import { SetUserIconRequest } from "@/types/setUserIconRequest";
import toast from "react-hot-toast";
import { useUserSettingsStore } from "@/store/userSettings";

export function SetProfileIconIdButton({
  imageId
}: {
  imageId: string;
}) {
  const setProfileImageId = useUserSettingsStore((state) => state.setProfileImageId);

  return <IconButton
    tooltip="Set as profile icon"
    onClick={async () => {
      const body: SetUserIconRequest = { imageId };

      const toastId = toast.loading("Setting profile icon...");
    
      try {
        const res = await fetch("/api/user/icon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
  
        if (res.status !== 200) {
          console.log(await res.json());
          toast.error("Failed to set profile icon", { id: toastId });
        } else {
          toast.success("Profile icon set", { id: toastId });
          setProfileImageId(imageId);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to set profile icon", { id: toastId });
      }
    }}
  >
    <ProfileIcon className="w-5 h-5" />
  </IconButton>;
}
  