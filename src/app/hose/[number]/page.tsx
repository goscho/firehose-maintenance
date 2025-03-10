export interface HosePageProps {
  params: Promise<{
    number: number;
  }>;
}

export default async function HosePage({ params }: HosePageProps) {
  const { number } = await params;
  return <div>Hier gibts bald Details zum Schlauch {number}</div>;
}
