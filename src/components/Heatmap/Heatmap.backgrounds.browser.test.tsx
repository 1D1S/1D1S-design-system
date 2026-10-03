import { createRoot } from 'react-dom/client'
import { expect, test } from 'vitest'

import { Heatmap, type HeatmapProps } from './Heatmap'

const palette: HeatmapProps['palette'] = [
  'rgb(0, 0, 0)',
  'rgb(1, 1, 1)',
  'rgb(2, 2, 2)',
  'rgb(3, 3, 3)',
  'rgb(4, 4, 4)',
]
const FROZEN = 'rgb(9, 9, 9)'
const SPLIT = 'linear-gradient(to right, rgb(10, 0, 0) 50%, rgb(0, 10, 0) 50%)'

async function cellsOf(props: Partial<HeatmapProps>): Promise<CSSStyleDeclaration[]> {
  const host = document.createElement('div')
  host.style.setProperty('--frozen', FROZEN)
  document.body.append(host)
  createRoot(host).render(
    <Heatmap rows={1} cols={3} cells={[1, 2, 3]} palette={palette} {...props} />,
  )
  await new Promise((resolve) => setTimeout(resolve, 50))
  const grid = host.querySelector('[data-slot="heatmap"]')!
  return Array.from(grid.children, (el) => getComputedStyle(el))
}

test('backgrounds 가 없으면 기존대로 frozen → 팔레트', async () => {
  const [a, b, c] = await cellsOf({ frozen: [false, true, false] })
  expect(a.backgroundColor).toBe('rgb(1, 1, 1)')
  expect(b.backgroundColor).toBe(FROZEN)
  expect(c.backgroundColor).toBe('rgb(3, 3, 3)')
  expect(a.backgroundImage).toBe('none')
})

test('backgrounds 는 frozen·팔레트보다 우선하고, undefined 칸은 기존 규칙', async () => {
  const [a, b, c] = await cellsOf({
    frozen: [true, true, false],
    backgrounds: [SPLIT, undefined, SPLIT],
  })
  expect(a.backgroundImage).toContain('linear-gradient')
  expect(a.backgroundColor).toBe('rgba(0, 0, 0, 0)')
  expect(b.backgroundColor).toBe(FROZEN)
  expect(c.backgroundImage).toContain('linear-gradient')
})
