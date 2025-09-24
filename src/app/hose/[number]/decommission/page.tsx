import TouchButton from "@/app/_components/touch-button";
import HoseDetails from "@/app/_components/hose-details";
import { redirect } from "next/navigation";
import {
  getFireHoseByNumberAndOwner,
  decommissionFireHose,
} from "@/lib/fireHoseRepository";
import { requireAuth } from "@/lib/requireAuth";

export interface HoseDecommissionPageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HoseDecommissionPage({
  params,
}: HoseDecommissionPageProps) {
  const { number } = await params;
  const [owner, hoseNumber] = decodeURIComponent(number).split("__");

  const session = await requireAuth();
  const username = session?.user?.name;

  if (!username) {
    console.log("no user found in session - redirecting to home");
    redirect("/");
  }

  const firehose = await getFireHoseByNumberAndOwner(
    parseInt(hoseNumber),
    owner,
  );

  if (!firehose) {
    console.log(`firehose ${number} not found`);
    redirect("/");
  }

  const handleDecommission = async () => {
    "use server";

    console.log("decommissioning hose", firehose.id);
    await decommissionFireHose(firehose.id);
    console.log("hose decommissioned", number);
    redirect("/");
  };

  const handleCancel = async () => {
    "use server";
    redirect(`/hose/${encodeURIComponent(number)}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold text-red-600">Schlauch {firehose.owner.marker}-{firehose.number} ausmustern</h1>
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded max-w-md text-center">
        <p className="font-medium mb-2">
          Möchten Sie diesen Schlauch wirklich ausmustern?
        </p>
        <p className="text-sm">
          Diese Aktion kann nicht rückgängig gemacht werden.
        </p>
      </div>
      <HoseDetails firehose={firehose} />
      <div className="flex gap-4 mt-6">
        <form action={handleCancel}>
          <TouchButton label="Abbrechen" type="submit" />
        </form>
        <form action={handleDecommission}>
          <TouchButton label="Ausmustern" type="submit" primary />
        </form>
      </div>
    </main>
  );
}
