import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import EditLengthForm from "./edit-length-form";

const meta: Meta<typeof EditLengthForm> = {
  component: EditLengthForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentLength: { control: "number" },
  },
  args: { onSave: fn(), onCancel: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentLength: 20,
  },
};

export const LongHose: Story = {
  args: {
    currentLength: 100,
  },
};

export const ShortHose: Story = {
  args: {
    currentLength: 5,
  },
};
