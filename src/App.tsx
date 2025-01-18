import { useState } from "react";
import { PertProvider, Task, TaskInput, PertStyles } from "../lib/main";
import { JsonInput } from "./components/JsonInput";
import { PertChart } from "./components/PertChart";
import { PertDetails } from "./components/PertDetails";
import { StyleControls } from "./components/StyleControls";
import "./styles/styles.css";

const initTasks: TaskInput[] = [
  { key: "1", duration: 5, text: "A", dependsOn: ["8", "10", "11"] },
  { key: "2", duration: 4, text: "B", dependsOn: ["10", "11"] },
  { key: "3", duration: 2, text: "C" },
  { key: "4", duration: 3, text: "D", dependsOn: ["5", "8"] },
  { key: "5", duration: 6, text: "E", dependsOn: ["3"] },
  { key: "6", duration: 8, text: "F" },
  { key: "7", duration: 3, text: "G" },
  { key: "8", duration: 5, text: "H", dependsOn: ["3", "6", "7"] },
  { key: "9", duration: 3, text: "I", dependsOn: ["1", "2", "4"] },
  { key: "10", duration: 5, text: "J", dependsOn: ["3", "6"] },
  { key: "11", duration: 2, text: "K", dependsOn: ["6", "7"] },
  { key: "12", duration: 4, text: "L", dependsOn: ["9"] },
  { key: "13", duration: 4, text: "M", dependsOn: ["9"] },
];

const App = () => {
  const [tasks, setTasks] = useState<TaskInput[]>(initTasks);
  const [error, setError] = useState<string | null>(null);
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

  const onSelect = (task: Task) => {
    console.log("Selected Task:", task);
  };

  return (
    <PertProvider>
      <div className="app">
        <JsonInput onTasksChange={setTasks} onError={setError} initTasks={initTasks} />
        {error && <div className="error">{error}</div>}
        <PertChart tasks={tasks} styles={styles} onSelect={onSelect} />
        <StyleControls onStylesChange={setStyles} />
        <PertDetails />
      </div>
    </PertProvider>
  );
};

export default App;
