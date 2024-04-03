import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export function AboveInputLogin() {
  const {
    status
  } = useSession();

  if (status === "authenticated") {
    return null;
  }

  return <Button variant="default"
    onClick={() => {
      signIn();
    }}
  >
    Sign up - 3 free generations
  </Button>;
}