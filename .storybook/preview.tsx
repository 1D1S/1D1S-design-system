import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/styles/globals.css';

// 다크 토글. 색은 전부 `colors.css` 의 `.dark` 램프가 뒤집으므로, 스토리를
// 감싼 요소에 그 클래스를 세우고 면을 --white(다크에선 카드 면)로 깔면 된다.
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
      return (
        <div
          className={dark ? 'dark' : undefined}
          style={{
            // 스토리 캔버스가 흰색으로 고정이라 다크에서 면이 안 보인다.
            // 앱 바탕과 같은 톤을 깔아 카드가 뜨는지 눈으로 확인할 수 있게.
            background: dark ? '#0e1013' : '#f3f4f6',
            color: 'var(--gray-900)',
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
