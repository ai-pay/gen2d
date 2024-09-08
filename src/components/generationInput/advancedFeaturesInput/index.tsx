"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Accordion, AccordionContent, AccordionItem
} from "@/components/ui/accordion";
import { AdvancedFeatureInputDalle3 } from "./dalle3";
import { AdvancedFeatureInputStabilityCore } from "./stability";
import {
  Button, Select, SelectItem
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";
import { GenerateImageRequest } from "../../../types/generateImageRequest";

const options: Record<string, string> = {
  "stability-ai-ultra": "Stability AI Ultra",
  "stability-ai-core": "Stability AI Core",
  "dall-e-3": "Dalle-3",
};

export function AdvancedModelSelection({
  modelDetails,
  setModelDetails,
}: {
  modelDetails: GenerateImageRequest["modelDetails"];
  setModelDetails: (model: GenerateImageRequest["modelDetails"]) => void;
}) {
  return <Accordion
    className="w-full flex justify-between gap-3"
    type="single"
    collapsible>
    <AccordionItem
      className="w-full"
      value="item-1">
      <div
        className="w-full flex justify-between gap-3">
        <Select
          variant="bordered"
          classNames={{
            value: "text-foreground",
          }}
          items={Object.entries(options).map(([key, label]) => ({
            key,
            label,
          }))}
          onSelectionChange={(selected) => {
            if (selected === "all") {
              return;
            }

            const key = selected.keys().next().value as GenerateImageRequest["modelDetails"]["model"] || "dall-e-3";

            switch (key) {
              case "stability-ai-ultra":
                setModelDetails({
                  model: "stability-ai-ultra",
                  negative_prompt: "",
                });
                break;
              case "stability-ai-core":
                setModelDetails({
                  model: "stability-ai-core",
                  negative_prompt: "",
                });
                break;
              case "dall-e-3":
                setModelDetails({
                  model: "dall-e-3",
                  quality: "hd",
                  style: "vivid",
                });
                break;
            }
          }}
          selectedKeys={[modelDetails.model]}
        >
          {(item) => <SelectItem
            key={item.key}>{item.label}</SelectItem>}
        </Select>

        <Button
          variant="bordered"
          className="text-sm px-8 transition-all [&[data-state=open]>svg]:rotate-180"
          as={AccordionPrimitive.Trigger}
        >
          Model Options
          <ChevronDown
            className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </Button>
      </div>

      <AccordionContent
        className="grid gap-3 pt-3">
        {modelDetails.model === "stability-ai-ultra" && <AdvancedFeatureInputStabilityCore
          modelDetails={modelDetails}
          setDetails={setModelDetails} />}

        {modelDetails.model === "stability-ai-core" && <AdvancedFeatureInputStabilityCore
          modelDetails={modelDetails}
          setDetails={setModelDetails} />}

        {modelDetails.model === "dall-e-3" && <AdvancedFeatureInputDalle3
          modelDetails={modelDetails}
          setDetails={setModelDetails} />}
      </AccordionContent>
    </AccordionItem>
  </Accordion>;
}
