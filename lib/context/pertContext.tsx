import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { TaskInput, PertOptions } from "../types/global.types.ts";
import {
  InternalPertResultType,
  InternalPertContextType,
  PertDataType,
} from "../types/pert.types.ts";
import PertCalculator from "../utlis/Pert.ts";

const EMPTY_RESULT: InternalPertResultType = {
  tasks: new Map(),
  levels: new Map(),
  links: [],
  criticalPaths: [],
  projectDuration: 0,
};

const pertContext = createContext<InternalPertContextType | null>(null);
const internalPertContext = createContext<InternalPertContextType | null>(null);

const createPertProvider = (Context: React.Context<InternalPertContextType | null>) => {
  return ({ children }: { children: ReactNode }) => {
    const [pertData, setPertResults] = useState<InternalPertResultType>(EMPTY_RESULT);
    const [error, setError] = useState<string | null>(null);

    const calculatePertResults = useCallback((data: TaskInput[]) => {
      try {
        const results: InternalPertResultType = new PertCalculator(data).solve();
        setPertResults(results);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setPertResults(EMPTY_RESULT);
        setError(err.message);
      }
    }, []);

    return (
      <Context.Provider
        value={{
          pertData,
          calculatePertResults,
          error,
        }}
      >
        {children}
      </Context.Provider>
    );
  };
};

export const PertProvider = createPertProvider(pertContext);
export const InternalPertProvider = createPertProvider(internalPertContext);

export const usePert = (options: PertOptions = { bounds: true }) => {
  const context = useContext(pertContext);
  if (!context) {
    throw new Error("usePertData must be used within a PertProvider");
  }
  const tasksArr = Array.from(context.pertData.tasks.values());
  const tasks = options?.bounds
    ? tasksArr.slice(1, -1).map((task) => ({
        ...task,
        dependsOn: task.dependsOn?.includes(tasksArr[0].key) ? [] : task.dependsOn,
      }))
    : tasksArr;

  return {
    ...context.pertData,
    tasks,
    error: context.error,
    projectDuration: context.pertData.projectDuration,
  } as PertDataType;
};

export const usePertContext = () => {
  const context = useContext(pertContext);
  if (!context) {
    const internalContext = useContext(internalPertContext);
    if (!internalContext) {
      throw new Error(
        "usePertData must be used within a PertProvider or InternalPertProvider"
      );
    }
    return internalContext;
  }
  return context;
};
