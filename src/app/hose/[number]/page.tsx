export interface HosePageProps {
  params: Promise<{
    number: number;
  }>;
}

export default async function HosePage({ params }: HosePageProps) {
  const { number } = await params;
  return <div>Reinigen & Prüfen: {number}</div>;
}
