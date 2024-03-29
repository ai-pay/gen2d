"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SupportedImageModel } from "ai-pay/models";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { GenerateImageRequest } from "@/types/generateImageRequest";

const options: Record<SupportedImageModel, string> = {
  "stability-ai-core": "Stability AI Core",
  "dall-e-3": "Dalle-3",
  "dall-e-2": "Dalle-2"
};

export function AdvancedModelSelection({
  modelDetails,
  setModelDetails
}: {
  modelDetails: GenerateImageRequest["modelDetails"];
  setModelDetails: (model: GenerateImageRequest["modelDetails"]) => void;
}) {
  return <Accordion className="w-full flex justify-between gap-3 pt-3" type="single" collapsible>
    <AccordionItem className="w-full" value="item-1">
      <div className="w-full flex justify-between gap-3">
        <Select onValueChange={(value: SupportedImageModel) => {
          switch (value) {
          case "stability-ai-core": {
            setModelDetails({
              model: "stability-ai-core",
            });
            break;
          }
          case "dall-e-2": {
            setModelDetails({
              model: "dall-e-2",
            });
            break;
          }
          case "dall-e-3": {
            setModelDetails({
              model: "dall-e-3",
              quality: "standard",
              style: "vivid"
            });
            break;
          }
          }
        }}>
          <SelectTrigger className="flex-grow font-medium text-neutral-500 hover:text-neutral-950 transition-all">
            <SelectValue placeholder={options[modelDetails.model]} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(options).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <AccordionTrigger className="
        py-0 px-3        
        text-neutral-500 hover:text-neutral-950
        whitespace-nowrap rounded-md text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300
        gap-3 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50">Model Options</AccordionTrigger>
      </div>
      
      <AccordionContent className="grid gap-3 pt-3">
        {modelDetails.model === "dall-e-2" && (
          <Label htmlFor="width">No configuration options for Dalle-2</Label>
        )}

        {modelDetails.model === "dall-e-3" && <>
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="quality">Quality</Label>
            <Input
              id="width"
              defaultValue="100%"
              className="col-span-2 h-10"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-3">
            <Label htmlFor="style">Style</Label>
            <Input
              id="width"
              defaultValue="100%"
              className="col-span-2 h-10"
            />
          </div>
        </>}
      </AccordionContent>
    </AccordionItem>
  </Accordion>;
}