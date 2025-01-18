import { useState } from "react";
import type { TaskInput } from "../../lib/main";

interface JsonInputProps {
  onTasksChange: (tasks: TaskInput[]) => void;
  onError: (error: string | null) => void;
  initTasks: TaskInput[];
}

export const JsonInput = ({ onTasksChange, onError, initTasks }: JsonInputProps) => {
  const [jsonInput, setJsonInput] = useState<string>(JSON.stringify(initTasks, null, 2));

  const handleJsonInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    try {
      const parsedTasks = JSON.parse(e.target.value) as TaskInput[];
      if (!Array.isArray(parsedTasks)) {
        throw new Error("Input must be an array of tasks.");
      }
      parsedTasks.forEach((task) => {
        if (!task.key || !task.text || typeof task.duration !== "number") {
          throw new Error("Each task must have a key, text, and duration.");
        }
      });
      onTasksChange(parsedTasks);
      onError(null);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Invalid JSON input.");
      onTasksChange([]);
    }
  };

  return (
    <div className="json-input">
      <h2>Input Tasks (JSON)</h2>
      <textarea
        value={jsonInput}
        onChange={handleJsonInputChange}
        className="json-textarea"
      />
    </div>
  );
};
