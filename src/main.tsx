import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import { PertProvider } from "@@/lib/main";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <PertProvider>
        <App />
      </PertProvider>
    </ThemeProvider>
  </StrictMode>
);
