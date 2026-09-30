import { page } from 'vitest/browser'
import React from 'react'
import { createRoot } from 'react-dom/client'
import type { DateRange } from 'react-day-picker'
import { expect, test } from 'vitest'

import { Dialog, DialogBody, DialogContent } from '../Dialog'
import { RangeDatePicker } from './DatePicker'

/**
 * 모달 다이얼로그 안, 스크롤되는 본문 맨 아래에 놓인 기간 선택기 —
 * 배너·홈 팝업 등록 폼과 같은 배치다(2026-09-30 아이패드 사파리 장애 회귀 방지).
 */
function Harness(): React.ReactElement {
  const [range, setRange] = React.useState<DateRange | undefined>()
  return (
    <Dialog open>
      <DialogContent>
        <DialogBody style={{ maxHeight: 220, overflowY: 'auto' }}>
          <div style={{ height: 400 }}>위쪽 채우기</div>
          <RangeDatePicker
            value={range}
            onChange={setRange}
            mobileSheet={false}
            placeholder="기간을 선택해주세요"
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

function mount(): void {
  const host = document.createElement('div')
  document.body.append(host)
  createRoot(host).render(<Harness />)
}

const tick = (ms = 150): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

test('모달 다이얼로그 안에서 기간 선택기가 열리고 날짜를 고를 수 있다', async () => {
  mount()

  await page.getByRole('button', { name: /기간을 선택해주세요/ }).click()
  await tick()

  const wrapper = document.querySelector<HTMLElement>(
    '[data-radix-popper-content-wrapper]',
  )
  expect(wrapper, '팝오버가 열려 있어야 한다(포커스 다툼으로 닫히면 null)').not.toBeNull()

  const style = getComputedStyle(wrapper!)
  expect(style.visibility, 'visibility:hidden 이면 화면에 안 보인다').not.toBe('hidden')
  expect(
    wrapper!.style.transform,
    '위치가 잡히기 전 화면 밖 상태(translate -200%)로 멈추면 안 된다',
  ).not.toContain('-200%')

  // 모달이 body 에 pointer-events:none 을 건 상태에서도 포인터가 팝오버에 닿아야 한다.
  const content = wrapper!.firstElementChild as HTMLElement
  const box = content.getBoundingClientRect()
  const hit = document.elementFromPoint(
    box.left + box.width / 2,
    box.top + box.height / 2,
  )
  expect(content.contains(hit), '팝오버가 포인터를 받아야 한다').toBe(true)

  // 날짜를 눌러 값이 실제로 반영되는지(트리거 라벨이 날짜로 바뀐다).
  const days = [...wrapper!.querySelectorAll<HTMLElement>('button')].filter((button) =>
    /^\d+$/.test(button.textContent?.trim() ?? ''),
  )
  expect(days.length, '달력 날짜가 렌더돼야 한다').toBeGreaterThan(10)
  days[9].click()
  await tick()
  expect(
    document.querySelector('[data-slot="dialog-content"], [role="dialog"]')!.textContent,
    '고른 날짜가 트리거에 표시돼야 한다',
  ).toMatch(/\d{4}\/\d{2}\/\d{2}/)
})
