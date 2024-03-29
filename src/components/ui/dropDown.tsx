import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export function DropDown<T extends string>({
  value,
  options,
  setValue
}: {
      value: T;
      options: Record<T, string>;
      setValue: (newVal: T) => void;
  }) {
  return <Select onValueChange={setValue}>
    <SelectTrigger className="flex-grow col-span-2 font-medium text-neutral-500 hover:text-neutral-950 transition-all">
      <SelectValue placeholder={options[value]} />
    </SelectTrigger>
    <SelectContent>
      {Object.entries(options).map(([value, label]) => (
        <SelectItem key={value} value={value as T}>
          {label as string}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>;
}