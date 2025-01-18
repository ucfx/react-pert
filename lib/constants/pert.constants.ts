export const DEFAULT_ERROR_DIMENSIONS = {
  width: 300,
  height: 200,
} as const;

export const DEFAULT_CHART_STYLES = {
  display: "block",
  boxSizing: "border-box",
  transition: "width 0.3s ease, height 0.3s ease",
} as const;

export const DEFAULT_COLORS = {
  CRITICAL: "#ff9147",
  TASK_BG: "#aaaeff",
  CHART_BG: "#fff",
  GRID: "#00000030",
  TEXT: "#000",
  SELECTED: "#6868ff",
  STROKE: "#615f77",
} as const;

export const DEFAULT_WIDTH = {
  BORDER: 1,
  HOVER_BORDER: 2,
  SELECTED_BORDER: 3,
} as const;
