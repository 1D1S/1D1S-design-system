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
