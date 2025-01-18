import { Arrows } from "../arrow/Arrows";
import Tasks from "../task/Tasks";
import Grid from "../grid/Grid";
import { InternalPertResultType, PertStyles } from "../../types/pert.types";
import {
  DEFAULT_CHART_STYLES,
  DEFAULT_COLORS,
  DEFAULT_WIDTH,
} from "../../constants/pert.constants";
import { ChartDimensions } from "../../types/task.types";

export interface ChartSVGProps {
  size: ChartDimensions;
  pertData: InternalPertResultType;
  selectedTask: string | null;
  hoveredTask: string | null;
  setHoveredTask: (taskKey: string | null) => void;
  styles: Omit<PertStyles, "gap" | "taskSize" | "fontSize"> & {
    gap: {
      x: number;
      y: number;
    };
    taskSize: number;
    fontSize: string;
  };
}

export const ChartSVG: React.FC<ChartSVGProps> = ({
  size,
  pertData,
  selectedTask,
  setHoveredTask,
  hoveredTask,
  styles: {
    fontSize,
    taskSize,
    gap,
    disableGrid,
    taskBackground,
    selectedBorderColor,
    borderColor,
    criticalColor,
    arrowColor,
    arrowWidth: arrowWidth,
    chartBackground,
    textColor,
    fontFamily,
    borderWidth,
    hoverBorderWidth,
    selectedBorderWidth,
    gridColor,
  },
}) => {
  const taskStyles = {
    "--task-bg": taskBackground ?? DEFAULT_COLORS.TASK_BG,
    "--task-bg-critical": criticalColor ?? DEFAULT_COLORS.CRITICAL,
    "--task-stroke-color": borderColor ?? DEFAULT_COLORS.STROKE,
    "--task-stroke-width": borderWidth ?? DEFAULT_WIDTH.BORDER,
    "--task-stroke-hover-width": hoverBorderWidth ?? DEFAULT_WIDTH.HOVER_BORDER,
    "--task-selected-stroke-width": selectedBorderWidth ?? DEFAULT_WIDTH.SELECTED_BORDER,
    "--task-selected-stroke-color": selectedBorderColor ?? DEFAULT_COLORS.SELECTED,
    "--task-text-color": textColor ?? DEFAULT_COLORS.TEXT,
    "--task-font-family": fontFamily ?? "inherit",
  } as React.CSSProperties;

  const arrowStyles = {
    "--arrow-stroke-color": arrowColor ?? DEFAULT_COLORS.STROKE,
    "--arrow-critical-stroke-color": criticalColor ?? DEFAULT_COLORS.CRITICAL,
    "--arrow-stroke-width": arrowWidth ?? 2,
  } as React.CSSProperties;

  const chartStyles: React.CSSProperties = {
    ...DEFAULT_CHART_STYLES,
    fontSize,
    backgroundColor: chartBackground,
  };

  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={chartStyles}
      dominantBaseline="central"
      textAnchor="middle"
    >
      <g className="content">
        {!disableGrid && <Grid size={size} taskSize={taskSize} strokeColor={gridColor} />}
        <Arrows
          gap={gap}
          arrows={pertData.links}
          taskSize={taskSize}
          size={size}
          levels={pertData.levels}
          tasks={pertData.tasks}
          selectedTask={selectedTask}
          hoveredTask={hoveredTask}
          arrowStyles={arrowStyles}
        />
        <Tasks
          gap={gap}
          size={size}
          taskSize={taskSize}
          tasks={pertData.tasks}
          levels={pertData.levels}
          selectedTask={selectedTask}
          setHoveredTask={setHoveredTask}
          taskStyles={taskStyles}
        />
      </g>
    </svg>
  );
};
