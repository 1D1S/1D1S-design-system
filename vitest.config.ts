import { playwright } from '@vitest/browser-playwright'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// 브라우저 모드 — 모달/포탈/포커스 트랩처럼 jsdom 이 못 흉내내는 동작을 실제
// 엔진에서 검증한다. DatePicker 가 다이얼로그 안에서 열리는지 회귀 테스트가 여기 산다.
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.browser.test.tsx'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }, { browser: 'webkit' }],
    },
  },
})
