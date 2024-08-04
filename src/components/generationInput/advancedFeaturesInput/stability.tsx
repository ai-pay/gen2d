import { Input } from "@nextui-org/react";
import { StabilityAICoreModelDetails } from "../../../types/generateImageRequest";

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
  </>;
}
