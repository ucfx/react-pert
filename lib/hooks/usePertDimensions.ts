import { useMemo } from "react";
import { ChartDimensions } from "../types/task.types";
import { usePertContext } from "../context/pertContext";

interface UsePertDimensionsProps {
  taskSize: number;
  gap: { x: number; y: number };
}

export const usePertDimensions = ({
  taskSize,
  gap,
}: UsePertDimensionsProps): ChartDimensions => {
  const { pertData } = usePertContext();

  return useMemo(() => {
    const levelValues = Array.from(pertData.levels.values());
    if (!levelValues.length) {
      return { width: 0, height: 0 };
    }

    const maxNodesPerLevel = Math.max(...levelValues.map((nodes) => nodes.length));

    return {
      width: (levelValues.length + 1) * taskSize + (levelValues.length - 1) * gap.x,
      height: (maxNodesPerLevel + 1) * taskSize + (maxNodesPerLevel - 1) * gap.y,
    };
  }, [pertData.levels, taskSize, gap]);
};
