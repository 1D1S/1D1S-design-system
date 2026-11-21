import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/styles/globals.css';

// 다크 토글. 색은 전부 `colors.css` 의 `.dark` 램프가 뒤집는다. 클래스는 소비자(웹·어드민)처럼
// <html> 에 세운다 — 감싼 div 에 세우면 `--brand: var(--main-800)`·`--fg: var(--gray-900)` 같은 별칭이
// :root 에서 라이트 값으로 굳은 채 내려와, 다크 스토리에서 의미 토큰만 라이트로 보였다.
// 컴포넌트별 스토리를 따로 만들 필요가 없다 — 툴바에서 두 테마를 오간다.
const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: '라이트 / 다크',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      const dark = context.globals.theme === 'dark';
      document.documentElement.classList.toggle('dark', dark);
      return (
        <div
          style={{
            // 플랫: 화면은 한 면(bg)이다 — 앱과 같은 바탕 위에서 본다.
            background: 'var(--bg)',
            color: 'var(--fg)',
            padding: 24,
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
