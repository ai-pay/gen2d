import { StabilityAICoreModelDetails } from "../../../types/generateImageRequest";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

export function AdvancedFeatureInputStabilityCore({
  modelDetails,
  setDetails,
}: {
    modelDetails: StabilityAICoreModelDetails;
    setDetails: (details: StabilityAICoreModelDetails) => void;
}) {

  return <>
    <div className="grid grid-cols-3 items-center gap-3">
      <Label htmlFor="negativePrompt">Negative Prompt</Label>
      <Input 
        id="negativePrompt"
        className="col-span-2 h-10"
        placeholder="Input negative prompt..."
        value={modelDetails.negative_prompt} 
        onChange={(e) => {
          setDetails({
            ...modelDetails,
            negative_prompt: e.target.value
          });
        }}
      />
    </div>
  </>;
}