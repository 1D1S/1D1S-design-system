import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
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
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Default Text',
  },
};

export const Headings: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Text {...args} size="heading1">
        Heading 1
      </Text>
      <Text {...args} size="heading2">
        Heading 2
      </Text>
    </div>
  ),
};

export const Body: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Text {...args} size="body1">
        Body 1
      </Text>
      <Text {...args} size="body2">
        Body 2
      </Text>
    </div>
  ),
};

export const Captions: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Text {...args} size="caption1">
        Caption 1
      </Text>
      <Text {...args} size="caption2">
        Caption 2
      </Text>
      <Text {...args} size="caption3">
        Caption 3
      </Text>
    </div>
  ),
};