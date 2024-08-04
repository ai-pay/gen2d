"use client";

import {
  Button, Tab, Tabs
} from "@nextui-org/react";
import { QueryType, useDisplayImageIdsStore } from "@/store/displayImageIds";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";

export const imageDisplayOptions: {
  type: QueryType;
  label: string;
}[] = [
  {
    type: "recent",
    label: "Recent Generations",
  },
];

export function DisplayImagesHeader({
  reloadImages,
}: {
  reloadImages: () => Promise<void>;
}) {
  const queryType = useDisplayImageIdsStore((state) => state.queryType.type);

  return <div
    className="flex items-center justify-start gap-3">
    <Tabs
      selectedKey={queryType}
      onSelectionChange={(val) => {
        if (val === "recent" && queryType !== "recent") {
          useDisplayImageIdsStore.setState({
            queryType: {
              type: "recent",
            },
          });
        }
      }}>
      {imageDisplayOptions.map((option) => (
        <Tab
          key={option.type}
          title={option.label}
        />
      ))}

      {queryType === "search" && <Tab
        key="search"
        title="Search"
      />}
    </Tabs>
    <Button
      isIconOnly
      variant="flat"
      onClick={reloadImages}
    >
      <ArrowPathIcon
        className="w-5 h-5 " />
    </Button>
  </div>;
}
