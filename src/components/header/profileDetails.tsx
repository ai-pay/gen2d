"use client";

import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";
import { useUserDetails } from "../../services/useUserDetails";
import { SheetTrigger, SheetContent, SheetTitle, SheetDescription, Sheet } from "../ui/sheet";

export function ProfileDetails() {
  const user = useUserDetails();

  return <Sheet>
    <SheetTrigger className="
    inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
    bg-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-800/80 text-neutral-500 hover:text-neutral-950
    h-10 w-10
    ">
      
      <UserIcon className="w-5 h-5" />
    </SheetTrigger>
    <SheetContent className="w-[400px] sm:w-[540px] h-full">
      <div className="overflow-scroll max-h-full grid gap-3 pt-3">
        <Button variant="default"
          onClick={() => {
            if (user.status === "authenticated") {
              // Logout
              signOut();
            } else {
              // Sign Up
              signIn();
            }
          }}
        >
          {user.status === "authenticated" ? "Logout" : "Sign Up"}
        </Button>

        {/* <SheetTitle>Profile Icon</SheetTitle> */}
        
        <SheetTitle>Recently Generated Images</SheetTitle>

        {Array.from({ length: 5 }).map((_, index) => (
          <SheetDescription key={index}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-neutral-200 rounded-lg" />
              <div className="flex flex-col gap-1">
                <div className="w-24 h-4 bg-neutral-200 rounded-lg" />
                <div className="w-32 h-4 bg-neutral-200 rounded-lg" />
              </div>
            </div>
          </SheetDescription>
        ))}
      </div>
    </SheetContent>
  </Sheet>;
  
}