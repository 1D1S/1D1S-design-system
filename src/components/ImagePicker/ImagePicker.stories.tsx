import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ImagePicker } from './ImagePicker';

const meta: Meta<typeof ImagePicker> = {
  title: 'Form/ImagePicker',
  component: ImagePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ImagePicker>;

export const Default: Story = {
  render: () => {
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

    const handleSelectFile = (file: File): void => {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    };

    const handleClear = (): void => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(undefined);
    };

    return (
      <ImagePicker
        previewUrl={previewUrl}
        onSelectFile={handleSelectFile}
        onClear={handleClear}
      />
    );
  },
};

export const WithImage: Story = {
  args: {
    previewUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    onSelectFile: () => {},
    onClear: () => {},
  },
};

export const WithoutClear: Story = {
  args: {
    previewUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    onSelectFile: () => {},
  },
};
