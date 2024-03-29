"use client";

import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { useGenerations } from "@/services/useGenerations";
import { QueryType, useDisplayImageIdsStore } from "@/store/displayImageIds";

export const imageDisplayOptions: {
  type: QueryType;
  label: string;
}[] = [
  {type: "recent", label: "Recent Generations"},
  {type: "popular", label: "Popular Generations (coming soon)"},
] as const; 


export function DisplayImagesHeader({
  initialImageIds,
}: {
  initialImageIds: string[];
}) {
  const {reloadImages} = useGenerations(initialImageIds);
  const queryType = useDisplayImageIdsStore((state) => state.queryType.type);

  return <div className="flex items-center justify-start gap-3">
    <Tabs value={queryType} className="" onValueChange={(val: string) => {
      if (val === "recent" && queryType !== "recent") {
        useDisplayImageIdsStore.setState({queryType: {type: "recent"}});
      }
    }}>
      <TabsList>
        {(queryType === "prompt" ? [...imageDisplayOptions, {type: "prompt", label: "Search"}] : imageDisplayOptions).map((option) => 
          <TabsTrigger key={option.type} value={option.type}>{option.label}</TabsTrigger>
        )}
      </TabsList>
    </Tabs>

    <Button
      variant="secondary"
      size="icon"
      onClick={reloadImages}
    >
      <ArrowPathIcon className="w-5 h-5 " />
    </Button>
  </div>;
}