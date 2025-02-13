import { generateKey } from "./generateKey";
import {
  TaskInput,
  Task,
  LevelType,
  LinkType,
  CriticalPath,
} from "../types/global.types";

class Pert {
  private levels: LevelType;
  private tasksMap: Map<string, Task>;
  private initialData: TaskInput[];
  private links: LinkType[];
  private criticalPaths: CriticalPath[];
  private lastTaskKey: string;
  private startTaskKey: string;
  private projectDuration: number;

  constructor(data: TaskInput[]) {
    this.initialData = data;
    this.tasksMap = new Map<string, Task>();
    this.lastTaskKey = `Finish-${generateKey()}`;
    this.startTaskKey = `Start-${generateKey()}`;
    this.links = [];
    this.criticalPaths = [];
    this.levels = new Map<number, string[]>();
    this.projectDuration = 0;
  }

  private convertDataToMap() {
    this.tasksMap = new Map<string, Task>();
    this.tasksMap.set(this.startTaskKey, {
      key: this.startTaskKey,
      duration: 0,
      text: "Start",
    } as Task);
    this.initialData.forEach((task, index) => {
      if (this.tasksMap.has(task.key)) throw Error(`Duplicate keys found ${task.key}`);
      this.tasksMap.set(
        task.key,
        (!task.dependsOn || task.dependsOn.length === 0
          ? { ...task, dependsOn: [this.startTaskKey], index }
          : { ...task, index }) as Task
      );
    });
  }

  private calculatePERT() {
    this.convertDataToMap();
    this.calcLevels();

    this.levels.forEach((indices) => {
      indices.forEach((index) => {
        this.calculateEarlyTimes(index);
      });
    });

    let lastTask = Array.from(this.tasksMap.values()).reduce((prev, current) =>
      prev.earlyFinish > current.earlyFinish ? prev : current
    );
    lastTask.lateFinish = lastTask.earlyFinish;
    lastTask.critical = true;

    this.tasksMap.set(this.lastTaskKey, {
      key: this.lastTaskKey,
      text: "Finish",
      dependsOn: [lastTask.key],
      duration: 0,
      earlyStart: lastTask.earlyFinish,
      earlyFinish: lastTask.earlyFinish,
      lateFinish: lastTask.earlyFinish,
      lateStart: lastTask.earlyFinish,
      level: this.levels.size,
      critical: true,
      freeFloat: 0,
      totalFloat: 0,
      index: this.tasksMap.size - 1,
    });
    this.levels.set(this.levels.size, [this.lastTaskKey]);

    this.projectDuration = lastTask.lateFinish;

    for (const [, indices] of [...this.levels.entries()].reverse()) {
      indices.forEach((index) => {
        this.calculateLateTimes(index, lastTask.lateFinish);
      });
    }

    this.levels.forEach((indices, key) => {
      this.levels.set(
        key,
        indices.sort((a, b) => this.tasksMap.get(a)!.index - this.tasksMap.get(b)!.index)
      );
    });
  }

  private getSuccessors(task: Task): Task[] {
    return Array.from(this.tasksMap.values()).filter(
      (t) => t.dependsOn && t.dependsOn.includes(task.key)
    );
  }

  private calculateEarlyTimes(k: string) {
    const task = this.tasksMap.get(k)!;
    if (!task.dependsOn) {
      task.earlyStart = 0;
    } else {
      let maxFinishTime = 0;
      task.dependsOn.forEach((dependency) => {
        const dependencyTask = this.tasksMap.get(dependency)!;

        maxFinishTime = Math.max(
          maxFinishTime,
          dependencyTask.earlyStart + dependencyTask.duration
        );
      });
      task.earlyStart = maxFinishTime;
    }
    task.earlyFinish = task.earlyStart + task.duration;
  }

  private calculateLateTimes(k: string, projectDuration: number) {
    const task = this.tasksMap.get(k)!;
    const successors = this.getSuccessors(task);
    if (task.key !== this.lastTaskKey && successors.length === 0)
      this.tasksMap.get(this.lastTaskKey)!.dependsOn?.push(k);

    let lateFinish =
      successors.length === 0
        ? projectDuration
        : Math.min(...successors.map((s) => s.lateFinish - s.duration));

    task.lateFinish = lateFinish;
    task.lateStart = task.lateFinish - task.duration;
    task.critical = task.earlyFinish === task.lateFinish;

    if (!task.critical) {
      task.freeFloat =
        (successors.length === 0
          ? projectDuration
          : Math.min(...successors.map((s) => s.earlyStart))) - task.earlyFinish;
      task.totalFloat = task.lateFinish - task.earlyFinish;
    } else {
      task.freeFloat = 0;
      task.totalFloat = 0;
    }
  }

  private calcLevels() {
    this.levels.clear();

    let arr: string[] = []; // To detect circular dependencies

    const calcLevel = (task: Task) => {
      if (arr.includes(task.key)) {
        throw new Error("Circular dependency detected");
      }
      if (!task.dependsOn || task.dependsOn.length === 0) {
        task.level = 0;
      } else {
        let maxLevel = 0;
        task.dependsOn.forEach((dependency) => {
          const dependencyTask = this.tasksMap.get(dependency)!;
          if (!dependencyTask) {
            throw new Error(`Task with KEY '${dependency}' was not found.`);
          }
          if (dependencyTask.level === undefined) {
            arr.push(task.key);
            calcLevel(dependencyTask);
          }
          maxLevel = Math.max(maxLevel, dependencyTask.level + 1);
        });
        task.level = maxLevel;
      }

      if (!this.levels.has(task.level)) {
        this.levels.set(task.level, []);
      }

      const levelArray = this.levels.get(task.level)!;

      if (!levelArray.includes(task.key)) {
        levelArray.push(task.key);
      }
    };

    this.tasksMap.forEach((task) => {
      if (task.level === undefined) {
        arr = [];
        calcLevel(task);
      }
    });
  }

  private calcNodeLinks() {
    const linkData: LinkType[] = [];
    const dependencies: string[] = [];

    this.tasksMap.forEach((task, key) => {
      if (task.dependsOn) {
        task.dependsOn.forEach((dependency) => {
          dependencies.push(dependency);
          linkData.push({
            from: dependency,
            to: task.key,
            critical: task.critical && this.tasksMap.get(dependency)!.critical,
          });
        });
      } else if (key !== this.startTaskKey) {
        linkData.push({
          from: this.startTaskKey,
          to: task.key,
          critical: task.critical,
        });
      }
    });

    this.tasksMap.forEach((task) => {
      if (!dependencies.includes(task.key) && task.key !== this.lastTaskKey) {
        linkData.push({
          from: task.key,
          to: this.lastTaskKey,
          critical: task.critical,
        });
      }
    });

    this.links = linkData;
  }

  private calcCriticalPaths() {
    this.calcNodeLinks();

    const criticalPaths: CriticalPath[] = [];
    const startNodes = this.links.filter(
      (link) =>
        link.critical && link.from === this.startTaskKey && link.to !== this.lastTaskKey
    );

    startNodes.forEach((startNode) => {
      const path: LinkType[] = [startNode];

      const findPath = (node: LinkType) => {
        const nodeLinks = this.links.filter(
          (link) => link.critical && link.from === node.to && link.to !== this.lastTaskKey
        );
        if (nodeLinks.length === 0) {
          criticalPaths.push(
            path.map((p) => ({
              text: this.tasksMap.get(p.to)!.text,
              key: p.to,
            }))
          );
        } else {
          nodeLinks.forEach((nodeLink) => {
            path.push(nodeLink);
            findPath(nodeLink);
            path.pop();
          });
        }
      };

      findPath(startNode);
    });

    this.criticalPaths = criticalPaths;
  }

  getTasks(): Map<string, Task> {
    this.calculatePERT();
    return this.tasksMap;
  }

  getCriticalPaths(): CriticalPath[] {
    if (this.criticalPaths.length === 0) this.calcCriticalPaths();
    return this.criticalPaths;
  }

  getLevels(): Map<number, string[]> {
    return this.levels;
  }

  getNodeLinks(): LinkType[] {
    return this.links;
  }

  getProjectDuration(): number {
    return this.projectDuration;
  }

  solve() {
    return {
      tasks: this.getTasks(),
      levels: this.getLevels(),
      criticalPaths: this.getCriticalPaths(),
      links: this.getNodeLinks(),
      projectDuration: this.getProjectDuration(),
    };
  }
}

export default Pert;
