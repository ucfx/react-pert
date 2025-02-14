import { HexAlphaColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PertStyles } from "@@/lib/main";
import { memo } from "react";
import { Input } from "./ui/input";

interface ColorProps {
  color?: string;
  colorName: keyof PertStyles;
  handleChange: (key: keyof PertStyles, value: any) => void;
}

export const Color = memo(function Color({ color, colorName, handleChange }: ColorProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <span
          className="w-16 h-8 border rounded-md block transition-all"
          style={{ background: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <HexAlphaColorPicker
          color={color}
          onChange={(color) => handleChange(colorName, color)}
        />
        <Input
          value={color?.toUpperCase()}
          onChange={(e) => handleChange(colorName, e.target.value)}
          className="mt-2 border rounded-md p-1"
        />
      </PopoverContent>
    </Popover>
  );
});
