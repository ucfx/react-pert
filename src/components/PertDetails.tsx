import { memo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePert, setSelectedTask, Task } from "@@/lib/main";
import { Separator } from "@/components/ui/separator";
import { Input } from "./ui/input";

export const PertDetails = memo(({ selectedTask }: { selectedTask: Task | null }) => {
  const { projectDuration, criticalPaths } = usePert();

  return (
    <ScrollArea className="h-[calc(100vh-3.5rem)] px-4 pb-4">
      <div>
        <h2 className="text-xl font-bold">Project Duration</h2>
        <p>{projectDuration} days</p>
      </div>
      <Separator className="my-3" />
      <div>
        <h2 className="text-xl font-bold">Critical Paths</h2>
        <ul>
          {criticalPaths.map((cp, index) => (
            <li key={index}>
              {cp.map((p, i) => (
                <span key={i}>
                  {p.text}
                  {i < cp.length - 1 && " → "}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </div>
      <Separator className="my-3" />
      <div>
        <h2 className="text-xl font-bold mb-2">Select Task by Key</h2>
        <Input
          type="text"
          placeholder="Enter task key"
          onChange={(e) => setSelectedTask(e.target.value ?? null)}
        />
      </div>
      <Separator className="my-3" />
      <div>
        <h2 className="text-xl font-bold">Selected Task</h2>
        {!selectedTask && <p>Click on a task to view its details</p>}
        {selectedTask && (
          <div>
            <h3 className="text-lg font-bold">{selectedTask.text}</h3>
            <p>Key: {selectedTask.key}</p>
            <p>Duration: {selectedTask.duration} day(s)</p>
            <p>Depends on: {selectedTask.dependsOn?.join(", ")}</p>
            <p>Early Start: {selectedTask.earlyStart}</p>
            <p>Early Finish: {selectedTask.earlyFinish}</p>
            <p>Late Start: {selectedTask.lateStart}</p>
            <p>Late Finish: {selectedTask.lateFinish}</p>
            <p>Level: {selectedTask.level}</p>
            <p>Critical: {selectedTask.critical ? "Yes" : "No"}</p>
            <p>Free Float: {selectedTask.freeFloat}</p>
            <p>Total Float: {selectedTask.totalFloat}</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
});
