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
  const [owner, hoseNumber] = parseFirehoseSlug(number);

  const firehose = await getFireHoseByNumberAndOwner(
    parseInt(hoseNumber),
    owner,
  );

  if (!firehose) {
    return (
      <main className={"flex flex-col gap-5 items-center w-full"}>
        <HoseNotFound ownerMarker={owner} hoseNumber={hoseNumber} />
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
