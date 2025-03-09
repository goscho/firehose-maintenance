import type { Meta, StoryObj } from "@storybook/react";

import MaintainHoseForm from "./maintain-hose-form";
import { fn } from "@storybook/test";

const meta = {
  component: MaintainHoseForm,
  args: {
    onCheckSuccess: fn(),
    onCheckFailed: fn(),
  },
} satisfies Meta<typeof MaintainHoseForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defectDescriptions: ["Einband defekt", "Loch im Schlauch", "..."],
  },
};
