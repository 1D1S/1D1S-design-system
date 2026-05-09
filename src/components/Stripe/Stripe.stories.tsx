import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stripe } from "./Stripe";

const meta: Meta<typeof Stripe> = {
  title: "Display/Stripe",
  component: Stripe,
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["peach", "cream", "mint", "blue", "sky", "rose", "gray"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stripe>;

export const Default: Story = {
  render: () => (
    <div className="h-28 w-60 overflow-hidden rounded-3">
      <Stripe tone="cream" label="run" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-3">
      {(
        [
          ["peach", "run"],
          ["mint", "book"],
          ["blue", "water"],
          ["cream", "code"],
          ["sky", "study"],
          ["rose", "alert"],
          ["gray", "misc"],
        ] as const
      ).map(([t, l]) => (
        <div key={t} className="h-28 overflow-hidden rounded-3">
          <Stripe tone={t} label={l} />
        </div>
      ))}
    </div>
  ),
};

export const NoLabel: Story = {
  render: () => (
    <div className="h-28 w-60 overflow-hidden rounded-3">
      <Stripe tone="peach" />
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div className="h-28 w-60 overflow-hidden rounded-3">
      <Stripe tone="#a78bfa" label="purple" />
    </div>
  ),
};
