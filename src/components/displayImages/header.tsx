"use client";

import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { ImageDisplayOption, imageDisplayOptions } from ".";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";

export function DisplayImagesHeader({
  defaultValue = imageDisplayOptions[0],
  onValueChange,
  refreshImages,
}: {
  defaultValue?: ImageDisplayOption;
  onValueChange?: (value: ImageDisplayOption) => void;
  refreshImages: () => void;
}) {
  return <div className="flex items-center justify-start gap-3">
    <Tabs value={defaultValue} className="" onValueChange={onValueChange as ((val: string) => void)}>
      <TabsList>
        {imageDisplayOptions.map((option) => 
          <TabsTrigger key={option} value={option}>{option}</TabsTrigger>
        )}
      </TabsList>
    </Tabs>

    <Button
      variant="secondary"
      size="icon"
      onClick={refreshImages}
    >
      <ArrowPathIcon className="w-5 h-5 " />
    </Button>
  </div>;
}