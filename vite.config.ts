import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tsConfigPaths from "vite-tsconfig-paths";
import { libInjectCss } from "vite-plugin-lib-inject-css";
const appConfig = {
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@@": resolve(__dirname, "./"),
    },
  },
};
const packageConfig = {
  plugins: [
    react(),
    tsConfigPaths(),
    dts({ rollupTypes: true, include: ["lib", "src/vite-env.d.ts"] }),
    libInjectCss(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "react-pert",
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
