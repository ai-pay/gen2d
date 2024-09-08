import {
  Input, Select, SelectItem
} from "@nextui-org/react";
import {
  StabilityAICoreModelDetails, StabilityAIUltraModelDetails, StabilityAiCoreStyles, stabilityAiCoreStyles
} from "../../../types/generateImageRequest";

export function AdvancedFeatureInputStabilityUltra({
  modelDetails,
  setDetails,
}: {
  modelDetails: StabilityAIUltraModelDetails;
  setDetails: (details: StabilityAIUltraModelDetails) => void;
}) {
  return <>
    <Input
      variant="bordered"
      label="Negative Prompt"
      placeholder="Input negative prompt..."
      value={modelDetails.negative_prompt}
      onValueChange={(value) => {
        setDetails({
          ...modelDetails,
          negative_prompt: value,
        });
      }}
    />
  </>;
}

export function AdvancedFeatureInputStabilityCore({
  modelDetails,
  setDetails,
}: {
  modelDetails: StabilityAICoreModelDetails;
  setDetails: (details: StabilityAICoreModelDetails) => void;
}) {
  return <>
    <Input
      variant="bordered"
      label="Negative Prompt"
      placeholder="Input negative prompt..."
      value={modelDetails.negative_prompt}
      onValueChange={(value) => {
        setDetails({
          ...modelDetails,
          negative_prompt: value,
        });
      }}
    />

    <Select
      variant="bordered"
      items={
        stabilityAiCoreStyles.map((style) => ({
          key: style,
          label: style,
        }))
      }
      label="Style"
      selectionMode="single"
      selectedKeys={[modelDetails.style]}
      onSelectionChange={(newVal) => {
        if (newVal === "all" || newVal.size === 0) {
          return;
        }
        setDetails({
          ...modelDetails,
          style: newVal.keys().next().value as StabilityAiCoreStyles,
        });
      }}
    >
      {(item) => <SelectItem
        key={item.key}>{item.label}
      </SelectItem>}

    </Select>

  </>;
}
