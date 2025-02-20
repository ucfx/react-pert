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
            <Button variant={"ghost"} size={"icon"} asChild>
              <a href="https://github.com/ucfx/react-pert" target="_blank">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </Button>
            <Button variant={"ghost"} size={"icon"} asChild>
              <a href="https://www.npmjs.com/package/react-pert" target="_blank">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground"
                >
                  <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
                </svg>
              </a>
            </Button>
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
