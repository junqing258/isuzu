import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  return {
    base:
      command === "build"
        ? "https://md-1301452398.cos.ap-nanjing.myqcloud.com/isuzu/"
        : "/",
    define: {
      __BUILD_TIME__: JSON.stringify(new Date().toLocaleString()),
    },
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.js"],
    },
  };
});
