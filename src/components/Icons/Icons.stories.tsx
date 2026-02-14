import type { Meta, StoryObj } from "@storybook/react";
import { ICON_NAMES, Icon } from "./Icon";

const IconGallery = ({ size, color }: { size: number; color: string }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: "16px",
      padding: "16px",
    }}
  >
    {ICON_NAMES.map((name) => (
      <div
        key={name}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          minHeight: "96px",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          backgroundColor: "#fff",
        }}
      >
        <Icon name={name} size={size} style={{ color }} />
        <span style={{ fontSize: "11px", color: "#666", textAlign: "center" }}>
          {name}
        </span>
      </div>
    ))}
  </div>
);

const meta: Meta<typeof IconGallery> = {
  title: "Icons/All Icons",
  component: IconGallery,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ background: "#f5f5f5", padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: "range", min: 16, max: 64, step: 2 },
    },
    color: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconGallery>;

export const Gallery: Story = {
  args: {
    size: 24,
    color: "#000000",
  },
};
