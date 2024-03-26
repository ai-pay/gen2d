import { useSession } from "next-auth/react";

export function useUserDetails() {
  const {status} = useSession();

  return {
    status
  };
}