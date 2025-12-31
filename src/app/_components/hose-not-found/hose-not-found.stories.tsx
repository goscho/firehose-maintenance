import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HoseNotFound from "./hose-not-found";

const meta = {
  component: HoseNotFound,
} satisfies Meta<typeof HoseNotFound>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ownerMarker: "FF-Murrhardt",
    hoseNumber: "123",
  },
};
