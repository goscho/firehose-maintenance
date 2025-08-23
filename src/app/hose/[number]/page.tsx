import { getFireHoseByNumberAndOwner } from "@/lib/repository";

export interface HosePageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HosePage({ params }: HosePageProps) {
  const { number } = await params;
  const [owner, hoseNumber] = decodeURIComponent(number).split("__");

  const firehose = await getFireHoseByNumberAndOwner(
    parseInt(hoseNumber),
    owner,
  );

  return (
    <div>
      Hier gibts bald Details zum Schlauch {firehose?.owner.marker}-
      {firehose?.number}
      <pre>{JSON.stringify(firehose, null, 2)}</pre>
    </div>
  );
}
