"use client";

import { NextUIProvider } from "@nextui-org/react";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useInitialiseStores } from "@/store/useInitialiseStores";

const queryClient = new QueryClient();

export function Providers({
  uid,
  children,
}: {
  uid: string | undefined;
  children: React.ReactNode;
}): React.JSX.Element {
  useInitialiseStores(uid);

  return <NextUIProvider>
    <QueryClientProvider
      client={queryClient}
    >
      <Toaster />
      {children}
    </QueryClientProvider>
  </NextUIProvider>;
}
