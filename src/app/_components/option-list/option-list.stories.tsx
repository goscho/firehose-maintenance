import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import OptionList from "./option-list";
import { fn } from "storybook/test";

const meta = {
  component: OptionList,
  args: { onSelectionChange: fn() },
} satisfies Meta<typeof OptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const WithSelection: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    selectedValue: "option2",
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2 (Deaktiviert)", disabled: true },
      { value: "option3", label: "Option 3" },
    ],
    selectedValue: "option1",
  },
};

export const GermanFireDepartments: Story = {
  args: {
    options: [
      { value: "ff-berlin", label: "Feuerwehr Berlin" },
      { value: "ff-muenchen", label: "Feuerwehr München" },
      { value: "ff-hamburg", label: "Feuerwehr Hamburg" },
      { value: "ff-koeln", label: "Feuerwehr Köln" },
    ],
    selectedValue: "ff-berlin",
  },
};