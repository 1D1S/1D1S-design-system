import type { Meta, StoryObj } from '@storybook/react';
import { TextArea, TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-[1280px] bg-gray-100 p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const InputOnly: Story = {
  args: {
    placeholder: 'e.g. 30 Days of Morning Running',
  },
};

export const WithRequiredLabel: Story = {
  args: {
    label: 'Challenge Title',
    required: true,
    placeholder: 'e.g. 30 Days of Morning Running',
  },
};

export const DescriptionTextArea: Story = {
  render: () => (
    <TextArea
      label="Description"
      labelHint="(Optional)"
      placeholder="Describe what participants will do in this challenge..."
      rows={8}
    />
  ),
};

export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: '검색어를 입력하세요',
  },
};
