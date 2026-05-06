import { getFireHoseByNumberAndOwner } from "@/lib/fireHoseRepository";
import { parseFirehoseSlug } from "@/lib/navigationUtils";
import HoseNotFound from "@/app/_components/hose-not-found/hose-not-found";
import MaintainHoseFormAdapter from "@/app/hose/[number]/maintain/maintain-hose-form-adapter";

export interface HoseMaintenancePageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HoseMaintenancePage({
  params,
}: HoseMaintenancePageProps) {
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
    return (
      <main className={"flex flex-col gap-5 items-center w-full"}>
        <HoseNotFound ownerMarker={owner} hoseNumber={hoseNumberString} />
      </main>
    );
  }

  return (
    <main className={"flex flex-col p-6 gap-6 items-center w-full"}>
      <h1 className="text-3xl font-bold">
        Schlauch {firehose.owner.marker}-{firehose.number} reinigen und prüfen
      </h1>
      <MaintainHoseFormAdapter firehose={firehose} />
    </main>
  );
}
