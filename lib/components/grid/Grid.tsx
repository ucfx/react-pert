import { DEFAULT_COLORS } from "../../constants/pert.constants";

interface GridProps {
  size: { width: number; height: number };
  taskSize: number;
  strokeColor: string | undefined;
}

export default function Grid({ size, taskSize, strokeColor }: GridProps) {
  const rowCount = Math.ceil(size.height / taskSize) + 1;
  const colCount = Math.ceil(size.width / taskSize) + 1;

  const renderLines = (count: number, isVertical: boolean, totalLength: number) =>
    Array.from({ length: count }, (_, i) => {
      const pos = i * taskSize;
      return (
        <line
          key={i}
          x1={isVertical ? pos : 0}
          y1={isVertical ? 0 : pos}
          x2={isVertical ? pos : totalLength}
          y2={isVertical ? totalLength : pos}
          style={{
            stroke: strokeColor ?? DEFAULT_COLORS.GRID,
          }}
        />
      );
    });

  return (
    <g>
      <g>{renderLines(rowCount, false, size.width)}</g>
      <g>{renderLines(colCount, true, size.height)}</g>
    </g>
  );
}
