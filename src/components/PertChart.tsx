import { Pert } from "../../lib/main";
import type { TaskInput, PertStyles, Task } from "../../lib/main";

interface PertChartProps {
  tasks: TaskInput[];
  styles: PertStyles;
  onSelect?: (task: Task) => void;
}

export const PertChart = ({ tasks, styles, onSelect }: PertChartProps) => {
  return (
    <div className="pert-chart">
      <h2>PERT Chart</h2>
      <div className="chart">
        <Pert tasks={tasks} onSelect={onSelect} styles={styles} />
      </div>
    </div>
  );
};
