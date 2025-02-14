import { PertStyles, TaskInput } from "@@/lib/main";

export const initTasks: TaskInput[] = [
  { key: "1", duration: 5, text: "A", dependsOn: ["8", "9", "10"] },
  { key: "2", duration: 4, text: "B", dependsOn: ["9", "10"] },
  { key: "3", duration: 2, text: "C" },
  { key: "4", duration: 3, text: "D", dependsOn: ["5", "8"] },
  { key: "5", duration: 6, text: "E", dependsOn: ["3"] },
  { key: "6", duration: 8, text: "F" },
  { key: "7", duration: 3, text: "G" },
  { key: "8", duration: 5, text: "H", dependsOn: ["3", "6", "7"] },
  { key: "9", duration: 5, text: "J", dependsOn: ["3", "6"] },
  { key: "10", duration: 2, text: "K", dependsOn: ["6", "7"] },
];

export const initialStyles: PertStyles = {
  disableGrid: false,
  taskSize: 100,
  fontFamily: "system-ui",
  fontSize: "md",
  textColor: "#000000",
  chartBackground: "#ffffff00",
  taskBackground: "#aaaeff",
  gridColor: "#83838350",
  borderWidth: 1,
  selectedBorderWidth: 3,
  hoverBorderWidth: 2,
  borderColor: "#615f77",
  selectedBorderColor: "#6868ff",
  criticalColor: "#ff9147",
  arrowColor: "#615f77",
  arrowWidth: 2,
  gap: { x: 100, y: 100 },
};
