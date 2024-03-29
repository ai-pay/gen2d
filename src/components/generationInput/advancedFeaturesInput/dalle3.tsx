import { Dalle3ModelDetails } from "../../../types/generateImageRequest";
import { DropDown } from "../../ui/dropDown";
import { Label } from "../../ui/label";



export function AdvancedFeatureInputDalle3({
  modelDetails,
  setDetails,
}: {
    modelDetails: Dalle3ModelDetails;
    setDetails: (details: Dalle3ModelDetails) => void;
}) {
  return <>
    <div className="grid grid-cols-3 items-center gap-3">
      <Label htmlFor="quality">Quality</Label>
      <DropDown 
        value={modelDetails.quality} 
        options={{
          standard: "Standard",
          hd: "HD"
        }} setValue={function (newVal): void {
          setDetails({
            ...modelDetails,
            quality: newVal
          });
        } } />
    </div>
    <div className="grid grid-cols-3 items-center gap-3">
      <Label htmlFor="style">Style</Label>
      <DropDown 
        value={modelDetails.style} 
        options={{
          vivid: "Vivid",
          natural: "Natural"
        }} setValue={function (newVal): void {
          setDetails({
            ...modelDetails,
            style: newVal
          });
        } } />
    </div>
  </>;
}