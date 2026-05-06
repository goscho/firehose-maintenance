import { getFireHoseByNumberAndOwner } from "@/lib/fireHoseRepository";
import { createFirehoseSlug, parseFirehoseSlug } from "@/lib/navigationUtils";
import TouchButton from "@/app/_components/touch-button";
import HoseDetails from "@/app/_components/hose-details";
import Link from "next/link";
import HoseNotFound from "@/app/_components/hose-not-found/hose-not-found";

export interface HosePageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HosePage({ params }: HosePageProps) {
  const { number } = await params;
  const [owner, hoseNumberString] = parseFirehoseSlug(number);
  const hoseNumber = parseInt(hoseNumberString, 10);

  if(isNaN(hoseNumber) || hoseNumber <= 0) {
    console.warn(`Ungültige Schlauchnummer: ${hoseNumberString}`);
    return (
      <main className="flex min-h-screen flex-col items-center p-6 gap-6">
        <HoseNotFound ownerMarker={owner} hoseNumber={hoseNumberString} />
      </main>
    );
  }

  const firehose = await getFireHoseByNumberAndOwner(
    hoseNumber,
    owner,
  );

  if (!firehose) {
    console.warn(`Unbekannte Schlauchnummer: ${hoseNumber}`);
    return (
      <main className="flex min-h-screen flex-col items-center p-6 gap-6">
        <HoseNotFound ownerMarker={owner} hoseNumber={hoseNumberString} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">
        Schlauch: {firehose.owner.marker}-{firehose.number}
      </h1>
      <HoseDetails firehose={firehose} />
      <div className="flex gap-4 mt-6">
        <Link href="/">
          <TouchButton label="Abbrechen" />
        </Link>
        <Link href={`/hose/${createFirehoseSlug(firehose)}/edit-length`}>
          <TouchButton label="Länge bearbeiten" />
        </Link>
        <Link href={`/hose/${createFirehoseSlug(firehose)}/decommission`}>
          <TouchButton label="Ausmustern" />
        </Link>
        <Link href={`/hose/${createFirehoseSlug(firehose)}/maintain`}>
          <TouchButton label="Reinigen & Prüfen" primary />
        </Link>
      </div>
    </main>
  );
}
