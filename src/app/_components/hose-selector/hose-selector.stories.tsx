import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HoseSelector from "./hose-selector";

const meta = {
  component: HoseSelector,
} satisfies Meta<typeof HoseSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
