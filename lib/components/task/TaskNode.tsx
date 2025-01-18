import React, { useMemo } from "react";
import { Task } from "../../types/global.types";
import styles from "./task.module.css";
import Metrics from "./Metrics";
import { TaskDimensions } from "../../types/task.types";

interface TaskNodeProps {
  task: Task;
  x: number;
  y: number;
  dimensions: TaskDimensions;
  onHover: (key: string, isHovering: boolean) => void;
  onTaskClick: (taskKey: string) => void;
  isVisible: boolean;
  isSelected: boolean;
  taskStyles: React.CSSProperties;
}

const TaskNode: React.FC<TaskNodeProps> = ({
  task,
  x,
  y,
  dimensions,
  onHover,
  onTaskClick,
  isVisible,
  isSelected,
  taskStyles,
}) => {
  const { radius } = dimensions;
  const pathData = useMemo(
    () => `
    M ${x - radius} ${y - radius / 3}
    L ${x + radius} ${y - radius / 3}
    M ${x - radius} ${y + radius / 3}
    L ${x + radius} ${y + radius / 3}
    M ${x} ${y + radius / 3}
    L ${x} ${y + radius}
    M ${x} ${y - radius}
    L ${x} ${y - radius / 3}
  `,
    [x, y, radius]
  );

  return (
    <g
      className={`${styles.task} ${isSelected ? styles.selected : ""} ${
        isVisible ? styles.visible : ""
      } ${task.critical ? styles.critical : ""}`}
      onMouseEnter={() => onHover(task.key, true)}
      onMouseLeave={() => onHover(task.key, false)}
      onClick={() => onTaskClick(task.key)}
      style={taskStyles}
    >
      <rect
        x={x - radius}
        y={y - radius}
        rx="20"
        ry="20"
        width={radius * 2}
        height={radius * 2}
      />
      <text x={x} y={y}>
        {task.text}
      </text>
      <Metrics task={task} x={x} y={y} dimensions={dimensions} />
      <path d={pathData} fill="none" />
    </g>
  );
};

export default React.memo(TaskNode);
