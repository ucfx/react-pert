import { Task } from "../../types/global.types";
import { TaskDimensions } from "../../types/task.types";

interface TaskMetricsProps {
  task: Task;
  x: number;
  y: number;
  dimensions: TaskDimensions;
}

const Metrics: React.FC<TaskMetricsProps> = ({ task, x, y, dimensions }) => {
  const { halfRadius, twoThirdsRadius } = dimensions;
  return (
    <>
      <text x={x - halfRadius} y={y - twoThirdsRadius} fill="black">
        {task.earlyStart}
      </text>
      <text x={x + halfRadius} y={y - twoThirdsRadius} fill="black">
        {task.earlyFinish}
      </text>
      <text x={x - halfRadius} y={y + twoThirdsRadius} fill="black">
        {task.lateStart}
      </text>
      <text x={x + halfRadius} y={y + twoThirdsRadius} fill="black">
        {task.lateFinish}
      </text>
    </>
  );
};

export default Metrics;
