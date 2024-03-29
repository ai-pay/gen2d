import { useUserSettingsStore } from "@/store/userSettings";
import { UserDetails } from "@/types/userDetails";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useQuery } from "react-query";

export function useUserDetails() {
  const {
    status
  } = useSession();

  const setUserImageIds = useUserSettingsStore((state) => state.setUserImageIds);
  const setProfileImageId = useUserSettingsStore((state) => state.setProfileImageId);


  const {
    data
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
    status,
    ...data,
  };
}