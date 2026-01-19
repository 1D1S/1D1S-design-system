import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/image": path.resolve(path.dirname(new URL(import.meta.url).pathname), "./next-image-mock.tsx"),
      "next/navigation": path.resolve(path.dirname(new URL(import.meta.url).pathname), "./next-navigation-mock.ts"),
      "next/link": path.resolve(path.dirname(new URL(import.meta.url).pathname), "./next-link-mock.tsx"),
    };
    return config;
  },
};
export default config;