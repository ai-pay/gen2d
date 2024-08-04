import { UserDetails } from "@/types/userDetails";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserSettingsStore } from "@/store/userSettings";

export function useUserDetails() {
  const setUserImageIds = useUserSettingsStore((state) => state.setUserImageIds);
  const setProfileImageId = useUserSettingsStore((state) => state.setProfileImageId);

  const {
    data,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: async () => {
      const response = await fetch("/api/user/details");
      return await response.json() as UserDetails;
    },
  });

  useEffect(() => {
    if (data) {
      setUserImageIds(data.imageIds);
      setProfileImageId(data.profileImageId);
    }
  }, [data, setUserImageIds, setProfileImageId]);

  return {
    ...data,
  };
}
