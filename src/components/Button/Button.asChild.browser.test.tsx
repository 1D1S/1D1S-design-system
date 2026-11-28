import React from 'react'
import { createRoot } from 'react-dom/client'
import { expect, test } from 'vitest'

import { Button } from './Button'

// asChild + 아이콘: Slot 에 자식 배열을 넘겨 터지던 회귀(소비 앱이 링크 대신 router.push 를 쓰던 이유).
test('asChild 는 아이콘을 자식 링크 안에 넣고 버튼 클래스를 입힌다', () => {
  const host = document.createElement('div')
  document.body.append(host)
  React.act(() =>
    createRoot(host).render(
      <Button asChild size="sm" iconLeft={<i data-testid="icon" />}>
        <a href="/x">새 이슈</a>
      </Button>,
    ),
  )
  const a = host.querySelector('a')!
  expect(a.getAttribute('href')).toBe('/x')
  expect(a.className).toContain('h-8')
  expect(a.querySelector('[data-testid=icon]')).not.toBeNull()
  expect(a.textContent).toBe('새 이슈')
})
