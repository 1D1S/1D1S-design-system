import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'search'],
    },
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    multiline: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    variant: 'default',
    placeholder: '텍스트를 입력하세요',
    label: '기본 텍스트 필드',
  },
};

export const WithError: Story = {
  args: {
    variant: 'default',
    placeholder: '텍스트를 입력하세요',
    label: '오류가 있는 필드',
    error: '필수 입력 항목입니다.',
  },
};

export const Search: Story = {
  args: {
    variant: 'search',
    placeholder: '검색어를 입력하세요',
  },
};

export const TextArea: Story = {
  args: {
    variant: 'default',
    multiline: true,
    placeholder: '긴 텍스트를 입력하세요',
    label: '텍스트 영역',
    rows: 4,
  },
};
