export interface HoseMaintenancePageProps {
  params: Promise<{
    number: number;
  }>;
}

export default async function HoseMaintenancePage({
  params,
}: HoseMaintenancePageProps) {
  const { number } = await params;
  return <div>Reinigen & Prüfen: {number}</div>;
}
