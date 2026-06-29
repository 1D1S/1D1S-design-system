import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  args: { count: 10, defaultPage: 1 },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    siblingCount: { control: { type: "number", min: 0, max: 3 } },
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};

export const ManyPages: Story = { args: { count: 50, defaultPage: 25 } };

export const FewPages: Story = { args: { count: 3 } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Pagination {...args} size="sm" />
      <Pagination {...args} size="md" />
      <Pagination {...args} size="lg" />
    </div>
  ),
  args: { count: 8 },
};

export const Controlled: Story = {
  render: (args) => {
    const [page, setPage] = React.useState(1);
    return (
      <div className="flex flex-col gap-2">
        <Pagination {...args} page={page} onPageChange={setPage} />
        <span className="text-sm text-gray-500">현재 페이지: {page}</span>
      </div>
    );
  },
  args: { count: 20 },
};
