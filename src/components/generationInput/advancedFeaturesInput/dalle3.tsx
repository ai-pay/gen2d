import { Dalle3ModelDetails } from "../../../types/generateImageRequest";
import { Select, SelectItem } from "@nextui-org/react";

export function AdvancedFeatureInputDalle3({
  modelDetails,
  setDetails,
}: {
  modelDetails: Dalle3ModelDetails;
  setDetails: (details: Dalle3ModelDetails) => void;
}) {
  return <>
    <Select
      variant="bordered"
      items={[
        {
          key: "standard",
          label: "Standard",
        },
        {
          key: "hd",
          label: "HD",
        },
      ]}
      label="Quality"
      selectionMode="single"
      selectedKeys={[modelDetails.quality]}
      onSelectionChange={(newVal) => {
        if (newVal === "all" || newVal.size === 0) {
          return;
        }
        setDetails({
          ...modelDetails,
          quality: newVal.keys().next().value as "standard" | "hd",
        });
      }}
    >
      {(item) => <SelectItem
        key={item.key}>{item.label}</SelectItem>}

    </Select>

    <Select
      variant="bordered"
      items={[
        {
          key: "vivid",
          label: "Vivid",
        }, {
          key: "natural",
          label: "Natural",
        },
      ]}
      label="Style"
      selectionMode="single"
      selectedKeys={[modelDetails.style]}
      onSelectionChange={(newVal) => {
        if (newVal === "all" || newVal.size === 0) {
          return;
        }
        setDetails({
          ...modelDetails,
          style: newVal.keys().next().value as "vivid" | "natural",
        });
      }}
    >
      {(item) => <SelectItem
        key={item.key}>{item.label}
      </SelectItem>}

    </Select>
  </>;
}
