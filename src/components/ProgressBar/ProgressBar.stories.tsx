import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[320px] bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    thickness: {
      control: { type: "range", min: 2, max: 16, step: 1 },
    },
    fillColor: {
      control: "color",
    },
    trackColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    label: "알고리즘 부시기",
    value: 56,
    showLabel: true,
    showValueText: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    label: "라벨 숨김",
    value: 64,
    showLabel: false,
    showValueText: true,
  },
};

export const WithoutValueText: Story = {
  args: {
    label: "퍼센트 숨김",
    value: 72,
    showLabel: true,
    showValueText: false,
  },
};

export const CustomThickness: Story = {
  args: {
    label: "굵기 조절",
    value: 48,
    thickness: 10,
    showLabel: true,
    showValueText: true,
  },
};

export const CustomColor: Story = {
  args: {
    label: "색상 조절",
    value: 80,
    fillColor: "#ff5722",
    trackColor: "#ffe6dd",
    showLabel: true,
    showValueText: true,
  },
};

export const Infinite: Story = {
  args: {
    label: "장기 프로젝트",
    value: 100,
    infinite: true,
    showLabel: true,
    showValueText: true,
    fillColor: "#22c55e",
  },
};

