import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from './page-title';

const meta: Meta<typeof PageTitle> = {
  title: 'PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['noSubtitle', 'withSubtitle'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    title: 'Page Title',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Page Title',
    subtitle: 'Subtitle',
    variant: 'withSubtitle',
  },
};
