import React, { useMemo, useCallback } from "react";
import styles from "./task.module.css";
import { setSelectedTask } from "../../components/Pert/PertChart";
import TaskLevel from "./TaskLevel";
import { Task } from "../../types/global.types";

export interface TasksProps {
  tasks: Map<string, Task>;
  levels: Map<number, string[]>;
  taskSize: number;
  size: {
    width: number;
    height: number;
  };
  gap: {
    x: number;
    y: number;
  };
  selectedTask: string | null;
  setHoveredTask: (taskKey: string | null) => void;
  taskStyles: React.CSSProperties;
}

const Tasks: React.FC<TasksProps> = ({
  tasks,
  levels,
  taskSize,
  size,
  gap,
  selectedTask,
  setHoveredTask,
  taskStyles,
}) => {
  const dimensions = useMemo(
    () => ({
      radius: taskSize / 2,
      halfRadius: taskSize / 4,
      twoThirdsRadius: (taskSize / 6) * 2,
    }),
    [taskSize]
  );

  const handleHover = useCallback(
    (key: string, isHovering: boolean) => {
      setHoveredTask(isHovering ? key : null);
    },
    [setHoveredTask]
  );

  const handleTaskClick = useCallback(
    (taskKey: string) => {
      setSelectedTask(selectedTask !== taskKey ? taskKey : null);
    },
    [selectedTask]
  );

  const renderedLevels = useMemo(() => {
    return Array.from(levels.entries()).map(([levelNum, keyList]) => {
      const totalHeight = keyList.length * taskSize + (keyList.length - 1) * gap.y;
      const offset = (size.height - totalHeight) / 2 + dimensions.radius;

      return (
        <TaskLevel
          key={levelNum}
          level={levelNum}
          keyList={keyList}
          tasks={tasks}
          taskSize={taskSize}
          gap={gap}
          offset={offset}
          dimensions={dimensions}
          selectedTask={selectedTask}
          onHover={handleHover}
          onTaskClick={handleTaskClick}
          taskStyles={taskStyles}
        />
      );
    });
  }, [
    levels,
    tasks,
    taskSize,
    gap,
    size.height,
    dimensions,
    selectedTask,
    handleHover,
    handleTaskClick,
    taskStyles,
  ]);

  return <g className={styles.tasks}>{renderedLevels}</g>;
};

export default React.memo(Tasks);
