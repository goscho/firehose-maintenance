import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ReportCard from "./index";

const meta = {
  component: ReportCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ReportCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DecommissionedHoses: Story = {
  args: {
    title: "Ausgemusterte Schläuche",
    description: "Übersicht aller ausgemusterten Schläuche in einem Zeitraum",
    href: "/reports/decommissioned",
  },
};

export const MaintenanceHistory: Story = {
  args: {
    title: "Wartungsverlauf",
    description: "Alle durchgeführten Prüfungen im Zeitraum",
    href: "/reports/maintenance",
  },
};

export const UpcomingTests: Story = {
  args: {
    title: "Anstehende Prüfungen",
    description: "Schläuche deren nächste Prüfung bald fällig ist",
    href: "/reports/upcoming",
  },
};
