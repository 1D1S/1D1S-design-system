import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Pagination",
  component: Pagination,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
    },
    totalPages: {
      control: { type: "number", min: 1 },
    },
    siblingCount: {
      control: { type: "number", min: 0 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationWithState = (args: any) => {
  const [page, setPage] = useState(args.currentPage || 1);
  return (
    <Pagination
      {...args}
      currentPage={page}
      onPageChange={(p) => setPage(p)}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
    siblingCount: 0,
  },
};

export const Short: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};

export const ManyPages: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    currentPage: 10,
    totalPages: 100,
    siblingCount: 1,
  },
};

export const MobileView: Story = {
  render: (args) => <PaginationWithState {...args} />,
  args: {
    currentPage: 5,
    totalPages: 20,
    siblingCount: 0,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
