import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePertContext } from "../../context/pertContext";
import { ChartSVG } from "./ChartSVG";
import Error from "../Error";
import { PertStyles } from "../../types/pert.types";
import { DEFAULT_ERROR_DIMENSIONS } from "../../constants/pert.constants";
import { usePertDimensions } from "../../hooks/usePertDimensions";
import { FONT_SIZES } from "../../constants/font.constants";
import { Task, TaskInput } from "../../types/global.types";

export interface PertChartProps {
  tasks: TaskInput[];
  styles: PertStyles;
  taskSize?: number;
  onSelect?: (task: Task) => void;
}

let externalSetSelectedTask: {
  setter: React.Dispatch<React.SetStateAction<string | null>>;
  onSelect: ((task: any) => void) | undefined;
  getTask: ((task: string) => Task | undefined) | undefined;
} | null = null;

export const setSelectedTask = (taskKey: string | null) => {
  if (!externalSetSelectedTask) return;

  const { setter, onSelect, getTask } = externalSetSelectedTask;

  if (!taskKey) {
    setter(null);
    onSelect?.(null);
    return;
  }

  const task = getTask?.(taskKey) ?? null;
  onSelect?.(task);
  setter(task ? taskKey : null);
};

export const PertChart: React.FC<PertChartProps> = ({ tasks, onSelect, styles }) => {
  const { pertData, calculatePertResults, error } = usePertContext();
  const tasksHashRef = useRef<string>();
  const [selectedTask, setSelectedTaskState] = useState<string | null>(null);
  const [hoveredTask, setHoveredTaskState] = useState<string | null>(null);

  const getTask = (taskkey: string): Task | undefined => {
    return pertData.tasks.get(taskkey);
  };

  const setterRef = useRef(setSelectedTaskState);
  externalSetSelectedTask = { setter: setterRef.current, getTask, onSelect };

  useEffect(() => {
    const tasksHash = JSON.stringify(tasks);
    if (tasksHashRef.current !== tasksHash) {
      calculatePertResults(tasks);
      setSelectedTask(null);
      tasksHashRef.current = tasksHash;
    }
  }, [tasks, calculatePertResults]);

  const setHoveredTask = useCallback((taskKey: string | null) => {
    setHoveredTaskState(taskKey);
  }, []);

  const { gap: customGap, taskSize, fontSize } = styles;

  const customTaskSize = Math.max(taskSize ?? 100, 70);

  const gap = useMemo(
    () => ({
      x: Math.max(customTaskSize, customGap?.x ?? 0),
      y: Math.max(customTaskSize, customGap?.y ?? 0),
    }),
    [customGap?.x, customGap?.y, customTaskSize]
  );

  const size = usePertDimensions({ taskSize: customTaskSize, gap });

  const customFontSize = useMemo(() => {
    if (!fontSize) return FONT_SIZES.default;
    if (typeof fontSize === "number") return `${fontSize}px`;
    return FONT_SIZES[fontSize as keyof typeof FONT_SIZES] || fontSize;
  }, [fontSize]);

  if (error) {
    return <Error error={error} />;
  }

  return (
    <ChartSVG
      size={error ? DEFAULT_ERROR_DIMENSIONS : size}
      pertData={pertData}
      selectedTask={selectedTask}
      hoveredTask={hoveredTask}
      setHoveredTask={setHoveredTask}
      styles={{ ...styles, fontSize: customFontSize, taskSize: customTaskSize, gap }}
    />
  );
};

export default PertChart;
