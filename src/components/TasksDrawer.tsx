import { memo, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TaskInput } from "@@/lib/main";
import { initTasks } from "@/constants/initStates";
import { AlertCircle } from "lucide-react";

interface TasksDrawerProps {
  setTasks: (tasks: TaskInput[]) => void;
}

export const TasksDrawer = memo(({ setTasks }: TasksDrawerProps) => {
  const [jsonInput, setJsonInput] = useState(
    `[\n${initTasks.map((obj) => `  ${JSON.stringify(obj)}`).join(",\n")}\n]`
  );
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    setError(null);

    if (!value.trim()) {
      return;
    }

    try {
      const parsedJson = JSON.parse(value);
      if (!Array.isArray(parsedJson)) {
        throw new Error("Input must be an array of tasks");
      }
      setTasks(parsedJson);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON format");
    }
  };

  return (
    <div className="justify-self-end">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Edit Tasks</Button>
        </DrawerTrigger>
        <DrawerContent className="w-full">
          <div className="mx-auto w-full max-w-2xl">
            <DrawerHeader>
              <DrawerTitle>Edit Tasks</DrawerTitle>
              <DrawerDescription className="text-sm text-muted-foreground">
                Paste your tasks JSON array below. Example format:
                <code className="block mt-2 p-2 bg-muted rounded-md text-xs">{`[ { "key": "1", "duration": 5, "text": "A", "dependsOn": ["8", "10", "11"] } ]`}</code>
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pt-0">
              <Textarea
                value={jsonInput}
                onChange={(e) => handleJsonChange(e.target.value)}
                placeholder="Paste your JSON here..."
                className="min-h-[300px] resize-none font-mono text-sm
                overflow-y-auto [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-track]:bg-transparent 
                [&::-webkit-scrollbar-thumb]:bg-border"
              />
              {error && (
                <div className="flex gap-2 items-center text-sm text-destructive mt-2 p-2 rounded-md border border-destructive">
                  <AlertCircle className="w-4 h-4 inline-block" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
});
