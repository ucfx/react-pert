import { useEffect } from "react";
import type { PertProps } from "../../types/global.type";
import { usePertContext } from "../../context/pertContext.tsx";

export default function Pert({ tasks }: PertProps) {
  const { pertData: pertData, calculatePertResults } = usePertContext();

  useEffect(() => {
    calculatePertResults(tasks);
  }, [tasks]);

  useEffect(() => {
    console.log("data", pertData);
  }, [pertData]);
  return <>PertChart</>;
}
