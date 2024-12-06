export type TaskType = {
  key: string;
  text: string;
  duration: number;
  dependsOn?: string[];
};

export type TaskResultType = TaskType & {
  earlyStart: number;
  earlyFinish: number;
  lateStart: number;
  lateFinish: number;
  level: number;
  critical: boolean;
  freeFloat: number;
  totalFloat: number;
  index: number;
};

export type LevelType = {
  [key: string]: string[];
};

export type LinkType = {
  from: string;
  to: string;
  critical: boolean;
};

type PathItemType = {
  text: string;
  key: string;
};

export type CriticalPathType = PathItemType[];

export type PertProps = {
  tasks: TaskType[];
};

export type PertDataType = {
  tasks: TaskResultType[];
  levels: LevelType;
  links: LinkType[];
  criticalPaths: CriticalPathType[];
};
