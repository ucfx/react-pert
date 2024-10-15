import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
const appConfig = {
  plugins: [react()],
  base: "/pert-react/",
};
const packageConfig = {
  plugins: [react(), tsConfigPaths(), dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "pert-react",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
};

export default defineConfig(({ mode }) => {
  return mode === "lib" ? packageConfig : appConfig;
});
