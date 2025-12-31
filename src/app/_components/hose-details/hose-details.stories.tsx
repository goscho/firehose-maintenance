import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HoseDetails from "./hose-details";
import { FireHose } from "@/lib/types";

const meta = {
  component: HoseDetails,
} satisfies Meta<typeof HoseDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockFirehose: FireHose = {
  id: "1",
  number: 123,
  owner: {
    id: "owner1",
    name: "Feuerwehr Muster",
    marker: "FM",
  },
  length: 20,
  diameter: "B",
  commissionedAt: new Date("2020-01-15"),
  decommissionedAt: null,
  maintenances: [
    {
      id: "m3",
      timestamp: new Date("2024-09-20T14:30:00"),
      testPassed: true,
      failureDescription: null,
      fireHoseId: "1",
    },
    {
      id: "m2",
      timestamp: new Date("2024-06-15T10:15:00"),
      testPassed: false,
      failureDescription: "Loch im Schlauch",
      fireHoseId: "1",
    },
    {
      id: "m1",
      timestamp: new Date("2024-03-10T16:45:00"),
      testPassed: true,
      failureDescription: null,
      fireHoseId: "1",
    },
  ],
};

const mockFirehoseNoMaintenance: FireHose = {
  ...mockFirehose,
  id: "2",
  number: 456,
  maintenances: [],
};

const mockFirehoseFailedTest: FireHose = {
  ...mockFirehose,
  id: "3",
  number: 789,
  maintenances: [
    {
      id: "m4",
      timestamp: new Date("2024-09-22T09:00:00"),
      testPassed: false,
      failureDescription: "Einband defekt, Kupplungen beschädigt",
      fireHoseId: "3",
    },
  ],
};

export const WithMaintenances: Story = {
  args: {
    firehose: mockFirehose,
  },
};

export const NoMaintenances: Story = {
  args: {
    firehose: mockFirehoseNoMaintenance,
  },
};

export const FailedTest: Story = {
  args: {
    firehose: mockFirehoseFailedTest,
  },
};
