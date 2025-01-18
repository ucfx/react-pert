import React from "react";
import { Task } from "../../types/global.types";
import { TaskDimensions } from "../../types/task.types";
import TaskNode from "./TaskNode";

interface TaskLevelProps {
  level: number;
  keyList: string[];
  tasks: Map<string, Task>;
  taskSize: number;
  gap: {
    x: number;
    y: number;
  };
  offset: number;
  dimensions: TaskDimensions;
  selectedTask: string | null;
  onHover: (key: string, isHovering: boolean) => void;
  onTaskClick: (taskKey: string) => void;
  taskStyles: React.CSSProperties;
}

const TaskLevel: React.FC<TaskLevelProps> = ({
  level,
  keyList,
  tasks,
  taskSize,
  gap,
  offset,
  dimensions,
  selectedTask,
  onHover,
  onTaskClick,
  taskStyles,
}) => {
  return (
    <g>
      {keyList.map((key, index) => {
        const task = tasks.get(key);
        if (!task) return null;

        const x = level * taskSize + taskSize + gap.x * level;
        const y = index * (taskSize + gap.y) + offset;
        const isVisible = Boolean(
          selectedTask &&
            (task.dependsOn?.includes(selectedTask) ||
              tasks.get(selectedTask)?.dependsOn?.includes(task.key))
        );

        const isSelected = task.key === selectedTask;
        return (
          <TaskNode
            key={task.key}
            task={task}
            x={x}
            y={y}
            dimensions={dimensions}
            onHover={onHover}
            onTaskClick={onTaskClick}
            isSelected={isSelected}
            isVisible={isVisible}
            taskStyles={taskStyles}
          />
        );
      })}
    </g>
  );
};

export default React.memo(TaskLevel);
