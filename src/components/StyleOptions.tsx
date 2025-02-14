import { FontSize, PertStyles } from "@@/lib/main";
import { memo, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Color } from "./Color";
import { CopyDrawer } from "./CopyDrawer";
import { Separator } from "./ui/separator";

const fontFamilies = [
  "Arial",
  "Roboto",
  "Helvetica",
  "Times New Roman",
  "sans-serif",
  "system-ui",
];

const fontSizes: FontSize[] = ["sm", "md", "lg", "xl", "2xl", "3xl"];

type StyleOptionsProps = PertStyles & {
  onStyleChange: (key: keyof PertStyles, value: any) => void;
};

export const StyleOptions = memo(({ onStyleChange, ...styles }: StyleOptionsProps) => {
  const handleChange = useCallback(
    (key: keyof PertStyles, value: any) => {
      onStyleChange(key, value);
    },
    [onStyleChange]
  );

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)] px-4 pb-4">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-4">Chart Properties</h2>
            <CopyDrawer styles={styles} />
          </div>

          {/* Grid Settings */}
          <div className="space-y-4 mb-6 pb-4 border-b">
            <h3 className="font-medium text-sm">Chart Settings</h3>
            <div className="flex justify-between items-center">
              <Label htmlFor="grid-color">Chart Background</Label>
              <Separator className="flex-1 mx-2" />
              <Color
                color={styles.chartBackground}
                colorName="chartBackground"
                handleChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="disable-grid">Disable Grid</Label>
              <Switch
                id="disable-grid"
                checked={styles.disableGrid}
                onCheckedChange={(checked) => handleChange("disableGrid", checked)}
              />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="grid-color">Grid Color</Label>
              <Separator className="flex-1 mx-2" />
              <Color
                color={styles.gridColor}
                colorName="gridColor"
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* Task Node Settings */}
          <div className="space-y-4 mb-6 pb-4 border-b">
            <h3 className="font-medium text-sm">Task Node Settings</h3>
            <div className="space-y-2">
              <Label>Task Size ({styles.taskSize}px)</Label>
              <Slider
                value={[styles.taskSize || 100]}
                min={70}
                max={200}
                step={1}
                onValueChange={([value]) => handleChange("taskSize", value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select
                value={styles.fontFamily}
                onValueChange={(value) => handleChange("fontFamily", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Select
                value={String(styles.fontSize)}
                onValueChange={(value) => handleChange("fontSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  {fontSizes.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex justify-between items-center">
              <Label htmlFor="text-color">Text Color</Label>
              <Separator className="flex-1 mx-2" />
              <Color
                color={styles.textColor}
                colorName="textColor"
                handleChange={handleChange}
              />
            </div>
            <div className="space-y-2 flex justify-between items-center">
              <Label htmlFor="task-background">Task Background</Label>
              <Separator className="flex-1 mx-2" />
              <Color
                color={styles.taskBackground}
                colorName="taskBackground"
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* Border Settings */}
          <div className="space-y-4 mb-6 pb-4 border-b">
            <h3 className="font-medium text-sm">Border Settings</h3>
            <div className="space-y-2">
              <Label>Border Width ({styles.borderWidth}px)</Label>
              <Slider
                value={[styles.borderWidth || 1]}
                min={1}
                max={5}
                step={1}
                onValueChange={([value]) => handleChange("borderWidth", value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Selected Border Width ({styles.selectedBorderWidth}px)</Label>
              <Slider
                value={[styles.selectedBorderWidth || 3]}
                min={1}
                max={5}
                step={1}
                onValueChange={([value]) => handleChange("selectedBorderWidth", value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Hover Border Width ({styles.hoverBorderWidth}px)</Label>
              <Slider
                value={[styles.hoverBorderWidth || 2]}
                min={1}
                max={5}
                step={1}
                onValueChange={([value]) => handleChange("hoverBorderWidth", value)}
              />
            </div>
            <div className="space-y-2 flex justify-between items-center">
              <Label htmlFor="border-color">Border Color</Label>

              <Separator className="flex-1 mx-2" />
              <Color
                color={styles.borderColor}
                colorName="borderColor"
                handleChange={handleChange}
              />
            </div>
            <div className="space-y-2 flex justify-between items-center">
              <Label htmlFor="selected-border-color">Selected Border Color</Label>

              <Separator className="flex-1 mx-2" />
              <Color
                color={styles.selectedBorderColor}
                colorName="selectedBorderColor"
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* Arrow Settings */}
          <div className="space-y-4 mb-6 pb-4 border-b">
            <h3 className="font-medium text-sm">Arrow Settings</h3>
            <div className="space-y-2">
              <Label>Arrow Width ({styles.arrowWidth}px)</Label>
              <Slider
                value={[styles.arrowWidth || 2]}
                min={1}
                max={5}
                step={1}
                onValueChange={([value]) => handleChange("arrowWidth", value)}
              />
            </div>
            <div className="space-y-2 flex justify-between items-center">
              <Label htmlFor="arrow-color">Arrow Color</Label>

              <Separator className="flex-1 mx-2" />
              <Color
                color={styles.arrowColor}
                colorName="arrowColor"
                handleChange={handleChange}
              />
            </div>
            <div className="space-y-2 flex justify-between items-center">
              <Label htmlFor="critical-color">Critical Path Color</Label>

              <Separator className="flex-1 mx-2" />
              <Color
                color={styles.criticalColor}
                colorName="criticalColor"
                handleChange={handleChange}
              />
            </div>
          </div>

          {/* Gap Settings */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Gap Settings</h3>
            <div className="space-y-2">
              <Label>Horizontal Gap ({styles.gap?.x ?? styles.taskSize}px)</Label>
              <Slider
                value={[styles.gap?.x ?? styles.taskSize ?? 100]}
                min={50}
                max={300}
                step={10}
                onValueChange={([value]) =>
                  handleChange("gap", { ...styles.gap, x: value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Vertical Gap ({styles.gap?.y ?? styles.taskSize}px)</Label>
              <Slider
                value={[styles.gap?.y ?? styles.taskSize ?? 100]}
                min={50}
                max={300}
                step={10}
                onValueChange={([value]) =>
                  handleChange("gap", { ...styles.gap, y: value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
});
