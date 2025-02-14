import { useCallback, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { PertChart } from "./components/PertChart";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { ModeToggle } from "./components/mode-toggle";
import { TasksDrawer } from "./components/TasksDrawer";
import { PertStyles, Task, TaskInput } from "@@/lib/main";
import { initialStyles, initTasks } from "./constants/initStates";
import "./index.css";

function App() {
  const [styles, setStyles] = useState(initialStyles);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState(initTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleSetStyles = useCallback((key: keyof PertStyles, value: any) => {
    setStyles((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSetTasks = useCallback((newTasks: TaskInput[]) => {
    setTasks(newTasks);
  }, []);

  const handleSelect = useCallback((Task: Task) => {
    console.log("selected task", Task);
    setSelectedTask(Task);
  }, []);

  return (
    <div className="flex min-h-screen bg-background p-2">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out relative",
          isSidebarOpen ? "w-80" : "w-0"
        )}
      >
        <div
          className={cn(
            "absolute top-0 left-0 h-full transition-transform duration-300 ease-in-out",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar
            selectedTask={selectedTask}
            {...styles}
            onStyleChange={handleSetStyles}
          />
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute -right-4 top-12 z-50 rounded-full shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
      <main
        className={cn(
          "px-5 transition-all duration-300 flex flex-col justify-between flex-1",
          isSidebarOpen ? "w-[calc(100%-20rem)]" : "w-full"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="">
            <h1 className="text-2xl font-bold">PERT Chart</h1>
            <p className="text-muted-foreground">
              {isSidebarOpen
                ? "Customize the appearance using the sidebar"
                : "Click the arrow to show style options"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <TasksDrawer setTasks={handleSetTasks} />
            <ModeToggle />
          </div>
        </div>
        <div className="w-full max-h-[calc(100vh-6rem)] rounded-lg shadow-sm border flex-1">
          <ScrollArea className="h-full whitespace-nowrap rounded-md">
            <PertChart styles={styles} tasks={tasks} handleSelect={handleSelect} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}

export default App;
