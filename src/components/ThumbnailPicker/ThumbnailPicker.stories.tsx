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

/** 대표 이미지 선택 — 타일 클릭으로 대표 지정/해제(토글) */
export const WithPrimary: Story = {
  render: () => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [primaryIndex, setPrimaryIndex] = useState<number>(-1);

    const handleSelectFiles = (files: File[]): void => {
      setPreviews((prev) => {
        const next = [
          ...prev,
          ...files.map((file) => URL.createObjectURL(file)),
        ];
        // 첫 등록 이미지를 자동 대표로
        if (prev.length === 0 && next.length > 0) setPrimaryIndex(0);
        return next;
      });
    };

    const handleRemove = (index: number): void => {
      setPreviews((prev) => {
        URL.revokeObjectURL(prev[index]);
        return prev.filter((_, i) => i !== index);
      });
      setPrimaryIndex((prev) => (prev === index ? 0 : prev));
    };

    return (
      <ThumbnailPicker
        previews={previews}
        onSelectFiles={handleSelectFiles}
        onRemove={handleRemove}
        max={5}
        primaryIndex={primaryIndex}
        onSelectPrimary={(index) =>
          setPrimaryIndex((prev) => (prev === index ? -1 : index))
        }
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

const swatch = (color: string): string =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="${color}"/></svg>`
  )}`;

/** N열 그리드 — `columns={3}` 이면 폭을 꽉 채우는 정사각형 3열(앱 사진 첨부). `size` 는 무시된다. */
export const Grid: Story = {
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
  render: () => {
    const [previews, setPreviews] = useState<string[]>(
      ["#ff8a65", "#7ab3ef", "#96e6c2", "#c4b5fd"].map(swatch)
    );
    const [primaryIndex, setPrimaryIndex] = useState(0);

    return (
      <ThumbnailPicker
        columns={3}
        max={5}
        previews={previews}
        onSelectFiles={(files) =>
          setPreviews((prev) => [
            ...prev,
            ...files.map((file) => URL.createObjectURL(file)),
          ])
        }
        onRemove={(index) =>
          setPreviews((prev) => prev.filter((_, i) => i !== index))
        }
        primaryIndex={primaryIndex}
        onSelectPrimary={(index) =>
          setPrimaryIndex((prev) => (prev === index ? -1 : index))
        }
      />
    );
  },
};
