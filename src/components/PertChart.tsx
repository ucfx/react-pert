import { Pert, PertStyles, Task, TaskInput } from "@@/lib/main";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface PertChartProps {
  styles: PertStyles;
  tasks: TaskInput[];
  handleSelect: (task: Task) => void;
}

export function PertChart({ styles, tasks, handleSelect }: PertChartProps) {
  const raduis = 200;
  return (
    // <div className="h-full flex items-center justify-center realtive">
    <div className="overflow-hidden grid place-items-center realtive">
      <div className="absolute top-0 right-0 m-4">
        <Popover>
          <PopoverTrigger asChild>
            <Info
              size={24}
              className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
            />
          </PopoverTrigger>
          <PopoverContent className="shadow-xl w-[350px]" side="left" align="start">
            <div className="p-0 flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4">Task Node</h2>
              <svg
                width={raduis}
                height={raduis}
                viewBox={`0 0 ${raduis} ${raduis}`}
                xmlns="http://www.w3.org/2000/svg"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <g>
                  <rect
                    rx="10"
                    ry="10"
                    width={raduis}
                    height={raduis}
                    // stroke="#615f77"
                    strokeWidth={5}
                    className="fill-transparent stroke-3 stroke-muted-foreground"
                  />
                  <text x={raduis / 2} y={raduis / 2} className="fill-foreground text-sm">
                    Task Name
                  </text>

                  <text x={raduis / 4} y={raduis / 6} className="fill-foreground text-sm">
                    Earliest Start
                  </text>
                  <text
                    x={(3 / 4) * raduis}
                    y={raduis / 6}
                    className="fill-foreground text-sm"
                  >
                    Latest Start
                  </text>
                  <text
                    x={raduis / 4}
                    y={(raduis * 5) / 6}
                    className="fill-foreground text-sm"
                  >
                    Earliest Finish
                  </text>
                  <text
                    x={(3 / 4) * raduis}
                    y={(raduis * 5) / 6}
                    className="fill-foreground text-sm"
                  >
                    Latest Finish
                  </text>

                  <path
                    d={`
                      M ${0} ${raduis / 3}
                      L ${raduis} ${raduis / 3}
                      M ${0} ${(raduis * 2) / 3}
                      L ${raduis} ${(raduis * 2) / 3}
                      M ${raduis / 2} ${(raduis * 2) / 3}
                      L ${raduis / 2} ${raduis}
                      M ${raduis / 2} ${0}
                      L ${raduis / 2} ${raduis / 3}
                    `}
                    className="stroke-muted-foreground stroke-2"
                  />
                </g>
              </svg>

              {/* definition of each one earlist start, latest start, earlist finish, latest finish */}

              <ul className="mt-4 text-sm text-justify flex flex-col gap-2">
                <li>
                  <strong>Earliest Start:</strong> The earliest time a task can start
                </li>
                <li>
                  <strong>Latest Start:</strong> The latest time a task can start without
                  delaying the project
                </li>
                <li>
                  <strong>Earliest Finish:</strong> The earliest time a task can finish
                </li>
                <li>
                  <strong>Latest Finish:</strong> The latest time a task can finish
                  without delaying the project
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Pert tasks={tasks} styles={styles} onSelect={handleSelect} />
    </div>
  );
}
