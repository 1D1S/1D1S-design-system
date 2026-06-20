import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// 컴포넌트를 소비하는 외부 프로젝트가 Tailwind 설정 없이도 디자인 시스템을
// 그대로 쓸 수 있도록, 완성된 단일 스타일시트(dist/style.css)를 만든다.
// globals.css 의 `@source "../components/**"` 가 빌드 시점에 컴포넌트 소스를
// 스캔하므로 animate-*, stagger-in, animate-in 등 라이브러리 전용 클래스와
// 해당 @keyframes 가 모두 정적으로 emit 된다.
export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    emptyOutDir: false, // 메인 lib 빌드(dist/index.es.js) 산출물을 지우지 않는다
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/styles/_entry.ts"),
      formats: ["es"],
      fileName: () => "_style-entry.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: "style.css",
      },
    },
  },
});
