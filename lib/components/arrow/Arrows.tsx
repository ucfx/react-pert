import { LevelType, LinkType } from "../../types/global.types";
import { InternalTaskResultType } from "../../types/pert.types";
import styles from "./arrow.module.css";

interface ArrowsProps {
  arrows: LinkType[];
  levels: LevelType;
  taskSize: number;
  size: { width: number; height: number };
  gap: {
    x: number;
    y: number;
  };
  tasks: InternalTaskResultType;
  selectedTask: string | null;
  hoveredTask: string | null;
  arrowStyles: React.CSSProperties;
}
export const Arrows: React.FC<ArrowsProps> = ({
  arrows,
  taskSize,
  levels,
  size,
  gap,
  tasks,
  selectedTask,
  hoveredTask,
  arrowStyles,
}) => {
  const isArrowVisible = (fromTaskKey: string, toTaskKey: string) => {
    return (
      selectedTask === fromTaskKey ||
      selectedTask === toTaskKey ||
      hoveredTask === fromTaskKey ||
      hoveredTask === toTaskKey
    );
  };

  const getTaskPosition = (taskKey: string, isFrom = false) => {
    const task = tasks.get(taskKey)!;
    const level = task.level;
    const index = levels.get(level)!.findIndex((t) => t === taskKey);
    const arrLength = levels.get(level)!.length;
    const totalHeight = arrLength * taskSize + (arrLength - 1) * gap.y;
    const offset = (size.height - totalHeight) / 2 + taskSize / 2;
    const x = level * (taskSize + gap.x) + (isFrom ? taskSize * (3 / 2) : taskSize / 2);
    const y = index * (taskSize + gap.y) + offset;
    return { x, y, level, task };
  };

  const className = `${styles.arrows} ${selectedTask ? styles.onSelect : ""} ${
    hoveredTask ? styles.onHover : ""
  }`;

  return (
    <g className={className}>
      {arrows.map((arrow, key) => {
        const {
          x: fromX,
          y: fromY,
          level: fromLevel,
          task: fromTask,
        } = getTaskPosition(arrow.from, true);
        const {
          x: toX,
          y: toY,
          level: toLevel,
          task: toTask,
        } = getTaskPosition(arrow.to);

        const className = `${styles.arrow} ${
          isArrowVisible(fromTask.key, toTask.key) ? styles.visible : ""
        } ${arrow.critical ? styles.critical : ""}`;

        return (
          <path
            className={className}
            key={key}
            d={`M ${fromX} ${fromY} C ${
              fromX + 20 * (toLevel - fromLevel) + (toX - fromX) / 1.2
            } ${fromY} ${
              fromX + 20 * (toLevel - fromLevel) + (toX - fromX) / 4
            } ${toY} ${toX} ${toY}`}
            style={arrowStyles}
          />
        );
      })}
    </g>
  );
};
