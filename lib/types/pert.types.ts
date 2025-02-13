import { CriticalPath, LevelType, LinkType, Task } from "./global.types";
import { TaskInput } from "./global.types";

// dont care about this type
export type InternalTaskResultType = Map<string, Task>;

// dont care about this type
interface ResultType {
  /**
   * Levels of tasks.
   */
  levels: LevelType;
  /**
   * Links between tasks.
   */
  links: LinkType[];
  /**
   * Critical paths.
   */
  criticalPaths: CriticalPath[];
  /**
   * Project Duration.
   */
  projectDuration: number;
}

// dont care about this type
interface ErrorType {
  /** Current error message, if any */
  error: string | null;
}

// dont care about this type
export interface InternalPertResultType extends ResultType {
  tasks: InternalTaskResultType;
}

// dont care about this type
export interface InternalPertContextType extends ErrorType {
  /** Current PERT calculation results */
  pertData: InternalPertResultType;
  /**
   * Calculates PERT results based on input tasks
   * @param data - Array of tasks to process
   * @example
   * calculatePertResults([
   *   { key: "1", duration: 5, text: "A", dependsOn: ["8", "10", "11"] },
   *   { key: "2", duration: 4, text: "B", dependsOn: ["10", "11"] },
   *   ...
   * ]);
   */
  calculatePertResults: (data: TaskInput[]) => void;
}

export interface PertDataType extends ResultType, ErrorType {
  /**
   * Task with metrics.
   */
  tasks: Task[];
}

export type FontSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | (string & {}) | number;

interface EventOption {
  /**
   * Invokes on task select.
   */
  onSelect?: (task: Task) => void;
}

export interface PertStyles {
  /**
   * Whether to disable grid lines in the chart.
   * @default false
   */
  disableGrid?: boolean;

  /**
   * Size of the task node in pixels.
   * @default 100
   * @min 70
   * @max 200
   */
  taskSize?: number;

  /**
   * Font family for the text in the task nodes.
   * @default "inherit"
   * @example
   * "Arial" | "Roboto" | "sans-serif"
   */
  fontFamily?: string;

  /**
   * Font size for the text in the task nodes.
   * @default "md"
   * @example
   * "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | 24 | "1.5rem"
   */
  fontSize?: FontSize;

  /**
   * Color of the text inside the task nodes.
   * @default "#000"
   */
  textColor?: string;

  /**
   * Background color of the entire chart.
   * @default "#fff"
   */
  chartBackground?: string;

  /**
   * Background color of the task nodes.
   * @default "#aaaeff"
   */
  taskBackground?: string;

  /**
   * Color of the grid lines in the chart.
   * @default "#83838350"
   */
  gridColor?: string;

  /**
   * Width of the border for task nodes.
   * @default 1
   */
  borderWidth?: number;

  /**
   * Width of the border for selected task nodes.
   * @default 3
   */
  selectedBorderWidth?: number;

  /**
   * Width of the border when hovering over task nodes.
   * @default 2
   */
  hoverBorderWidth?: number;

  /**
   * Color of the border for task nodes.
   * @default "#615f77"
   */
  borderColor?: string;

  /**
   * Color of the border for selected task nodes.
   * @default "#6868ff"
   */
  selectedBorderColor?: string;

  /**
   * Color for critical path elements (e.g., tasks or links).
   * @default "#ff9147"
   */
  criticalColor?: string;

  /**
   * Color of the arrows (links) between task nodes.
   * @default "#615f77"
   */
  arrowColor?: string;

  /**
   * Width of the arrows (links) between task nodes.
   * @default 2
   */
  arrowWidth?: number;

  /**
   * Gap between task nodes in the chart.
   * @default { x: TaskSize ?? 100, y: TaskSize ?? 100 }
   */
  gap?: { x?: number; y?: number };
}

export interface PertProps extends EventOption {
  tasks: TaskInput[];
  styles?: PertStyles;
}
