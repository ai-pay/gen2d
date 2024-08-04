import { Button } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "@/utils/firebase/clientApp";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserSettingsStore } from "@/store/userSettings";

export function AboveInputAiPayButton({
  uid,
}: {
  uid: string | undefined
}) {
  const creditsRemaining = useUserSettingsStore((state) => state.aiPayCreditsRemaining);

  const router = useRouter();

  const loginWithGoogle = useCallback(() => {
    (async () => {
      if (!auth) {
        return;
      }

      try {
        if (auth.currentUser) {
          const idToken = await auth.currentUser.getIdToken(true);

          const res = await fetch("/api/login", {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (!res.ok) {
            console.error("Failed to login", res);
          }
          router.refresh();
          return;
        }
      } catch (error) {
        console.error("Error getting token", error);
      }

      try {
        const userCredentials = await signInWithPopup(auth, new GoogleAuthProvider());
        const idToken = await userCredentials.user.getIdToken();

        const res = await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to login", res);
        }
      } catch (error) {
        console.error("Error signing in anonymously", error);
      }

      router.refresh();
    })();
  }, []);

  if (!uid) {
    return <Button
      color="primary"
      variant="shadow"
      onClick={loginWithGoogle}
    >
      Login with Google
    </Button>;
  }

  switch (creditsRemaining.state) {
    case "idle":
    case "loading": {
      return <Button
        isDisabled
        variant="bordered"
      >
        AI Pay Credits Remaining: ...loading
      </Button>;
    }
    case "success": {
      return <Button
        as="a"
        href={"https://www.ai-pay.io/request-access/kKhgY0MDUTRNFr5nBynn/?uid=" + uid}
        target="_blank"
        variant="bordered"
      >
        AI Pay Credits Remaining: {creditsRemaining.credits.toFixed(2)}
      </Button>;
    }
    case "no access": {
      return <Button
        as="a"
        href={"https://www.ai-pay.io/request-access/kKhgY0MDUTRNFr5nBynn/?uid=" + uid}
        target="_blank"
        color="primary"
        variant="shadow"
      >
        Link AI Pay to generate images
      </Button>;
    }
    case "error": {
      return <Button
        isDisabled
        variant="bordered"
      >
        AI Pay Credits Remaining: Error
      </Button>;
    }
  }
}
