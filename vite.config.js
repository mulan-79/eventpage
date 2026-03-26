import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Cloudflare Pages가 프로젝트 경로를 서브경로로 서빙하는 경우에도
  // 정적 assets 경로가 깨지지 않도록 상대 경로로 빌드합니다.
  base: "./"
});
