import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HoseTestHistory from "./hose-test-history";
import { Maintenance } from "@/lib/types";

const meta = {
  component: HoseTestHistory,
} satisfies Meta<typeof HoseTestHistory>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockMaintenances: Maintenance[] = [
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
];

const mockMaintenancesAllPassed: Maintenance[] = [
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
    testPassed: true,
    failureDescription: null,
    fireHoseId: "1",
  },
  {
    id: "m1",
    timestamp: new Date("2024-03-10T16:45:00"),
    testPassed: true,
    failureDescription: null,
    fireHoseId: "1",
  },
];

const mockMaintenancesMultipleFailed: Maintenance[] = [
  {
    id: "m4",
    timestamp: new Date("2024-09-22T09:00:00"),
    testPassed: false,
    failureDescription: "Einband defekt",
    fireHoseId: "1",
  },
  {
    id: "m3",
    timestamp: new Date("2024-06-15T10:15:00"),
    testPassed: false,
    failureDescription: "Loch im Schlauch",
    fireHoseId: "1",
  },
  {
    id: "m2",
    timestamp: new Date("2024-03-10T16:45:00"),
    testPassed: true,
    failureDescription: null,
    fireHoseId: "1",
  },
  {
    id: "m1",
    timestamp: new Date("2024-01-05T11:30:00"),
    testPassed: false,
    failureDescription: "Kupplungen beschädigt",
    fireHoseId: "1",
  },
];

export const MixedResults: Story = {
  args: {
    maintenances: mockMaintenances,
  },
};

export const AllPassed: Story = {
  args: {
    maintenances: mockMaintenancesAllPassed,
  },
};

export const MultipleFailed: Story = {
  args: {
    maintenances: mockMaintenancesMultipleFailed,
  },
};

export const SingleMaintenance: Story = {
  args: {
    maintenances: [mockMaintenances[0]],
  },
};
