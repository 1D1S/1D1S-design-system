import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { ThumbnailPicker } from "./ThumbnailPicker";

const meta: Meta<typeof ThumbnailPicker> = {
  title: "Form/ThumbnailPicker",
  component: ThumbnailPicker,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThumbnailPicker>;

/** 다중 업로드 — 최대 5장 */
export const Multiple: Story = {
  render: () => {
    const [previews, setPreviews] = useState<string[]>([]);

    const handleSelectFiles = (files: File[]): void => {
      setPreviews((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    };

    const handleRemove = (index: number): void => {
      setPreviews((prev) => {
        URL.revokeObjectURL(prev[index]);
        return prev.filter((_, i) => i !== index);
      });
    };

    return (
      <ThumbnailPicker
        previews={previews}
        onSelectFiles={handleSelectFiles}
        onRemove={handleRemove}
        max={5}
      />
    );
  },
};

/** 단일 업로드 — max={1} */
export const Single: Story = {
  render: () => {
    const [previews, setPreviews] = useState<string[]>([]);

    return (
      <ThumbnailPicker
        max={1}
        previews={previews}
        onSelectFiles={(files) =>
          setPreviews([URL.createObjectURL(files[0])])
        }
        onRemove={() => setPreviews([])}
      />
    );
  },
};
