import { redirect } from "next/navigation";
import { createMaintenance } from "@/lib/maintenanceRepository";
import { getFireHoseByNumberAndOwner } from "@/lib/fireHoseRepository";
import { requireAuth } from "@/lib/requireAuth";
import MaintainHoseForm from "@/app/_components/maintain-hose-form";
import HoseNotFound from "@/app/_components/hose-not-found/hose-not-found";

export interface HoseMaintenancePageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HoseMaintenancePage({
  params,
}: HoseMaintenancePageProps) {
  const { number } = await params;
  const [owner, hoseNumber] = decodeURIComponent(number).split("__");

  const session = await requireAuth();
  const username = session?.user?.name;

  if (!username) {
    console.log(
      "no user found in session - redirecting to home",
      "session",
      session,
    );
    redirect("/");
  }

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

  const defectDescriptions = [
    "Einband defekt",
    "Loch im Schlauch",
    "sonstiges",
  ];

  const success = async () => {
    "use server";
    console.log("check succeeded", number, owner, hoseNumber);

    await createMaintenance({
      username: username,
      fireHoseId: firehose.id,
      testPassed: true,
      failureDescription: null,
      timestamp: new Date(),
    });
    console.log("maintenance saved", number);
    redirect("/");
  };

  const failed = async (msg: string, navigateToHoseDetails: boolean) => {
    "use server";
    console.log("check failed - reason: ", msg);
    await createMaintenance({
      username: username,
      fireHoseId: firehose.id,
      testPassed: false,
      failureDescription: msg,
      timestamp: new Date(),
    });
    if (navigateToHoseDetails) {
      redirect(`/hose/${encodeURIComponent(number)}`);
    } else {
      redirect("/");
    }
  };

  return (
    <main className={"flex flex-col gap-5 items-center w-full"}>
      <h2 className={"text-2xl"}>Schlauch {number} reinigen und prüfen</h2>
      <MaintainHoseForm
        defectDescriptions={defectDescriptions}
        onCheckSuccess={success}
        onCheckFailed={failed}
      />
    </main>
  );
}
