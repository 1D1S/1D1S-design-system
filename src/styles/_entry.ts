// CSS 배포 번들용 엔트리 — 이 파일을 vite.config.css.ts 로 빌드하면
// 컴포넌트 소스를 스캔(@source)해 모든 유틸리티·keyframes·토큰을 담은
// dist/style.css 가 생성된다. (런타임에서 import 되는 파일은 아니다)
import "./globals.css";
