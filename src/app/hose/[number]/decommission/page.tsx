import { redirect } from "next/navigation";
import { parseFirehoseSlug } from "@/lib/navigationUtils";
import { getFireHoseByNumberAndOwner } from "@/lib/fireHoseRepository";
import DecommissionHoseFormAdapter from "@/app/hose/[number]/decommission/decommission-hose-form-adapter";

export interface HoseDecommissionPageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HoseDecommissionPage({
  params,
}: HoseDecommissionPageProps) {
  const { number } = await params;
  const [owner, hoseNumber] = parseFirehoseSlug(number);

  const firehose = await getFireHoseByNumberAndOwner(
    parseInt(hoseNumber),
    owner,
  );

  if (!firehose) {
    console.log(`firehose ${number} not found`);
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">
        Schlauch {firehose.owner.marker}-{firehose.number} ausmustern
      </h1>
      <DecommissionHoseFormAdapter firehose={firehose} />
    </main>
  );
}
