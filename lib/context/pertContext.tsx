import { createContext, ReactNode, useContext, useState } from "react";
import { PertDataType, TaskType } from "../types/global.type.ts";
import PertCalculator from "../utlis/Pert.ts";

const EMPTY_RESULT: PertDataType = {
  tasks: [],
  levels: {},
  links: [],
  criticalPaths: [],
};

type PertContextType = {
  pertData: PertDataType;
  calculatePertResults: (data: TaskType[]) => void;
};

const PertContext = createContext<PertContextType | null>(null);

export const PertProvider = ({ children }: { children: ReactNode }) => {
  const [pertData, setPertResults] = useState<PertDataType>(EMPTY_RESULT as PertDataType);

  const calculatePertResults = (data: TaskType[]) => {
    const results: PertDataType = new PertCalculator(data).solve();
    setPertResults(results);
  };

  return (
    <PertContext.Provider value={{ pertData, calculatePertResults }}>
      {children}
    </PertContext.Provider>
  );
};

export const usePertData = () => {
  const context = useContext(PertContext);
  if (!context) {
    throw new Error("usePertData must be used within a PertProvider");
  }
  return context.pertData;
};

export const usePertContext = () => {
  const context = useContext(PertContext);
  if (!context) {
    throw new Error("usePertContext must be used within a PertProvider");
  }
  return context;
};
