import { useState } from "react";
import type { PertStyles } from "../../lib/main";

interface StyleControlsProps {
  onStylesChange: (styles: PertStyles) => void;
}

export const StyleControls = ({ onStylesChange }: StyleControlsProps) => {
  const [styles, setStyles] = useState<PertStyles>({
    disableGrid: false,
    taskSize: 100,
    gap: { x: 150, y: 150 },
    fontFamily: "Arial",
    fontSize: "md",
    textColor: "#000000",
    chartBackground: "#ffffff",
    taskBackground: "#aaaeff",
    gridColor: "#00000030",
    borderWidth: 1,
    selectedBorderWidth: 3,
    hoverBorderWidth: 2,
    borderColor: "#615f77",
    selectedBorderColor: "#6868ff",
    criticalColor: "#ff9147",
    arrowColor: "#615f77",
    arrowWidth: 2,
  });

  const handleChange = (key: string, value: any) => {
    const newStyles = { ...styles, [key]: value };
    setStyles(newStyles);
    onStylesChange(newStyles);
  };

  return (
    <div className="style-controls">
      <h2>Test Properties</h2>
      <div className="controls-grid">
        <label>
          Task Size:
          <input
            type="number"
            value={styles.taskSize}
            onChange={(e) => handleChange("taskSize", Number(e.target.value))}
          />
        </label>
        <label>
          X Gap:
          <input
            type="number"
            value={styles.gap?.x}
            onChange={(e) =>
              handleChange("gap", { ...styles.gap, x: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Y Gap:
          <input
            type="number"
            value={styles.gap?.y}
            onChange={(e) =>
              handleChange("gap", { ...styles.gap, y: Number(e.target.value) })
            }
          />
        </label>
        <label>
          Disable Grid:
          <input
            type="checkbox"
            checked={styles.disableGrid}
            onChange={(e) => handleChange("disableGrid", e.target.checked)}
          />
        </label>
        <label>
          Font Family:
          <input
            type="text"
            value={styles.fontFamily}
            onChange={(e) => handleChange("fontFamily", e.target.value)}
          />
        </label>
        <label>
          Font Size:
          <input
            type="text"
            value={styles.fontSize}
            onChange={(e) => handleChange("fontSize", e.target.value)}
          />
        </label>
        <label>
          Text Color:
          <input
            type="color"
            value={styles.textColor}
            onChange={(e) => handleChange("textColor", e.target.value)}
          />
        </label>
        <label>
          Chart Background:
          <input
            type="color"
            value={styles.chartBackground}
            onChange={(e) => handleChange("chartBackground", e.target.value)}
          />
        </label>
        <label>
          Task Background:
          <input
            type="color"
            value={styles.taskBackground}
            onChange={(e) => handleChange("taskBackground", e.target.value)}
          />
        </label>
        <label>
          Critical Color:
          <input
            type="color"
            value={styles.criticalColor}
            onChange={(e) => handleChange("criticalColor", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};
