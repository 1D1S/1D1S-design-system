import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: [
        'display1',
        'display2',
        'heading1',
        'heading2',
        'body1',
        'body2',
        'caption1',
        'caption2',
        'caption3',
        'pageTitle',
      ],
    },
    weight: {
      control: 'select',
      options: ['bold', 'medium', 'regular', 'light'],
    },
    as: {
      control: 'text',
      description: 'HTML tag or component to render as',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
};

export const Headings: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} size="heading1">
        Heading 1
      </Label>
      <Label {...args} size="heading2">
        Heading 2
      </Label>
    </div>
  ),
};

export const Body: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} size="body1">
        Body 1
      </Label>
      <Label {...args} size="body2">
        Body 2
      </Label>
    </div>
  ),
};

export const Captions: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} size="caption1">
        Caption 1
      </Label>
      <Label {...args} size="caption2">
        Caption 2
      </Label>
      <Label {...args} size="caption3">
        Caption 3
      </Label>
    </div>
  ),
};
