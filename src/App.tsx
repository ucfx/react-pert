import { usePertData, PertProvider, Pert } from "../lib/main";
import type { TaskType } from "../lib/main";

export default function App() {
  const tasks: TaskType[] = [
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

  return (
    <PertProvider>
      <Pert tasks={tasks} />
      <PertDetails />
    </PertProvider>
  );
}

const PertDetails = () => {
  const { tasks, criticalPaths } = usePertData();

  return (
    <div>
      <h3>Project Duration : {tasks[tasks.length - 1]?.lateStart}</h3>
      <h3>Critical Paths:</h3>
      <div>
        {criticalPaths.map((cp, index) => (
          <div key={index}>
            {cp.map((p, i) => (
              <label key={i}>
                <span>{p.text}</span>
                {i !== cp.length - 1 && <span> {"→"}</span>}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
