import { InternalPertProvider } from "../../context/pertContext";
import { PertProps, PertStyles } from "../../types/pert.types";
import PertChart from "./PertChart";

export const Pert: React.FunctionComponent<PertProps> = ({ styles, ...rest }) => (
  <InternalPertProvider>
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        boxSizing: "border-box",
      }}
    >
      <PertChart {...rest} styles={styles ?? ({} as PertStyles)} />
    </div>
  </InternalPertProvider>
);
