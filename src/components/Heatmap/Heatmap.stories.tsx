import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heatmap } from "./Heatmap";
import { Button } from "../Button";

const meta: Meta<typeof Heatmap> = {
  title: "Display/Heatmap",
  component: Heatmap,
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["main", "mint", "blue", "green", "gray"] },
    cols: { control: { type: "range", min: 4, max: 52, step: 1 } },
  },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Heatmap>;

const randomCells = (rows: number, cols: number): number[] =>
  Array.from({ length: rows * cols }, () => {
    const v = Math.random();
    if (v < 0.25) return 0;
    if (v < 0.5) return 1;
    if (v < 0.75) return 2;
    if (v < 0.92) return 3;
    return 4;
  });

export const Empty: Story = { args: { cols: 20 } };

export const WithData: Story = {
  args: { cols: 20, cells: randomCells(7, 20) },
};

export const Tones: Story = {
  render: () => {
    const data = randomCells(7, 20);
    return (
      <div className="flex flex-col gap-3">
        {(["main", "mint", "blue", "green", "gray"] as const).map((t) => (
          <div key={t}>
            <div className="text-[11px] text-gray-500 mb-1">tone: {t}</div>
            <Heatmap cols={20} cells={data} tone={t} />
          </div>
        ))}
      </div>
    );
  },
};

const dateForIndex = (index: number, cols: number, rows: number): string => {
  // 가장 최근 셀이 우측 하단(=마지막 column 마지막 row)이라고 가정
  const total = cols * rows;
  const daysAgo = total - 1 - index;
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
};

export const Interactive: Story = {
  args: {
    cols: 20,
    cells: randomCells(7, 20),
  },
  render: (args) => (
    <Heatmap
      {...args}
      renderCellTooltip={({ index, level }) =>
        `${dateForIndex(index, args.cols ?? 20, 7)} · ${level}회 활동`
      }
    />
  ),
};

export const InteractiveWithActions: Story = {
  args: {
    cols: 20,
    cells: randomCells(7, 20),
  },
  render: (args) => (
    <Heatmap
      {...args}
      renderCellTooltip={({ index, level }) =>
        `${dateForIndex(index, args.cols ?? 20, 7)} · ${level}회 활동`
      }
      renderCellActions={({ index }) => (
        <div className="flex gap-1.5">
          <Button
            size="xs"
            variant="primary"
            onClick={() => alert(`일지 보기: ${dateForIndex(index, args.cols ?? 20, 7)}`)}
          >
            일지 보기
          </Button>
          <Button size="xs" variant="ghost" className="text-white">
            공유
          </Button>
        </div>
      )}
      onCellClick={({ index, level }) =>
        console.log("cell clicked", { index, level })
      }
    />
  ),
};

/** 프리즈로 메운 날 — `frozen` 인 칸은 레벨과 무관하게 하늘색(`--frozen`). 다크에서도 그대로다. */
export const Frozen: Story = {
  args: {
    cols: 20,
    cells: randomCells(7, 20),
    frozen: Array.from({ length: 140 }, (_, i) => i % 11 === 0),
  },
};

const half = (a: string, b: string): string =>
  `linear-gradient(135deg, ${a} 50%, ${b} 50%)`;

/**
 * 셀별 배경 — `backgrounds[i]` 가 있으면 `frozen`·팔레트보다 우선한다.
 * 그라디언트로 한 칸을 여러 색으로 나누고, 둥근 모서리가 그대로 잘라낸다.
 * `undefined` 인 칸은 기존 규칙(frozen → 팔레트)대로 칠해진다.
 */
export const CellBackgrounds: Story = {
  args: {
    cols: 20,
    cells: randomCells(7, 20),
    frozen: Array.from({ length: 140 }, (_, i) => i % 11 === 0),
    backgrounds: Array.from({ length: 140 }, (_, i) => {
      if (i % 7 === 3) return half("var(--brand)", "var(--frozen)");
      if (i % 13 === 5)
        return "linear-gradient(to right, var(--main-500) 33.33%, var(--mint-500) 33.33% 66.66%, var(--blue-500) 66.66%)";
      return undefined;
    }),
  },
};
