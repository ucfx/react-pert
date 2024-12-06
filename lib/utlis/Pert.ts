import { generateKey } from "../helpers/generateKey";
import {
  TaskType,
  TaskResultType,
  LevelType,
  LinkType,
  CriticalPathType,
} from "../types/global.type";

class Pert {
  private levels: LevelType;
  private tasksMap: Map<string, TaskResultType>;
  private initialData: TaskType[];
  private links: LinkType[];
  private criticalPaths: CriticalPathType[];
  private tasks: TaskResultType[];
  private lastTaskKey: string;
  private startTaskKey: string;

  constructor(data: TaskType[]) {
    this.initialData = data;
    this.tasksMap = new Map<string, TaskResultType>();
    this.lastTaskKey = `Finish-${generateKey()}`;
    this.startTaskKey = `Start-${generateKey()}`;
    this.levels = {};
    this.links = [];
    this.criticalPaths = [];
    this.tasks = [];
  }

  private convertDataToMap() {
    this.tasksMap = new Map<string, TaskResultType>();
    this.tasksMap.set(this.startTaskKey, {
      key: this.startTaskKey,
      duration: 0,
      text: "Start",
    } as TaskResultType);
    this.initialData.forEach((task, index) => {
      if (this.tasksMap.has(task.key)) throw Error(`Duplicate keys found ${task.key}`);
      this.tasksMap.set(
        task.key,
        (!task.dependsOn || task.dependsOn.length === 0
          ? { ...task, dependsOn: [this.startTaskKey], index }
          : { ...task, index }) as TaskResultType
      );
    });
  }

  private calculatePERT() {
    this.convertDataToMap();
    this.calcLevels();

    let levelKeys = Object.keys(this.levels).map((e) => parseInt(e));
    levelKeys.forEach((levelKey) => {
      this.levels[levelKey].forEach((index) => {
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
      level: levelKeys.length,
      critical: true,
      freeFloat: 0,
      totalFloat: 0,
      index: this.tasksMap.size - 1,
    });
    this.levels[levelKeys.length] = [this.lastTaskKey];

    for (let i = levelKeys.length - 1; i >= 0; i--) {
      this.levels[levelKeys[i]].forEach((index) => {
        this.calculateLateTimes(index, lastTask.lateFinish);
      });
    }

    levelKeys.forEach((levelKey) => {
      this.levels[levelKey] = this.levels[levelKey].sort(
        (a, b) => this.tasksMap.get(a)!.index - this.tasksMap.get(b)!.index
      );
    });

    this.tasks = Array.from(this.tasksMap.values());
  }

  private getSuccessors(task: TaskResultType): TaskResultType[] {
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

  private calculateLateTimes(k: string, lateFinishLastTask: number) {
    const task = this.tasksMap.get(k)!;
    const successors = this.getSuccessors(task);

    let lateFinish =
      successors.length === 0
        ? lateFinishLastTask
        : Math.min(...successors.map((s) => s.lateFinish - s.duration));

    task.lateFinish = lateFinish;
    task.lateStart = task.lateFinish - task.duration;
    task.critical = task.earlyFinish === task.lateFinish;

    if (!task.critical) {
      task.freeFloat =
        (successors.length === 0
          ? lateFinishLastTask
          : Math.min(...successors.map((s) => s.earlyStart))) - task.earlyFinish;
      task.totalFloat = task.lateFinish - task.earlyFinish;
    } else {
      task.freeFloat = 0;
      task.totalFloat = 0;
    }
  }

  private calcLevels() {
    this.levels = {};

    let arr: string[] = []; // To detect circular dependencies

    const calcLevel = (task: TaskResultType) => {
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
      if (!this.levels[task.level]) {
        this.levels[task.level] = [];
      }
      if (!this.levels[task.level].includes(task.key)) {
        this.levels[task.level].push(task.key);
      }
    };

    this.tasksMap.forEach((task) => {
      arr = [];
      calcLevel(task);
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

    const criticalPaths: CriticalPathType[] = [];
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

  getTasks(): TaskResultType[] {
    this.calculatePERT();
    return this.tasks;
  }

  getCriticalPaths(): CriticalPathType[] {
    if (this.criticalPaths.length === 0) this.calcCriticalPaths();
    return this.criticalPaths;
  }

  getLevels(): LevelType {
    return this.levels;
  }

  getNodeLinks(): LinkType[] {
    return this.links;
  }

  solve() {
    return {
      tasks: this.getTasks(),
      levels: this.getLevels(),
      criticalPaths: this.getCriticalPaths(),
      links: this.getNodeLinks(),
    };
  }
}

export default Pert;
