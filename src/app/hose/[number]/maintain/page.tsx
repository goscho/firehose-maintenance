import MaintainHoseForm from "@/app/_components/maintain-hose-form";
import { redirect } from "next/navigation";

export interface HoseMaintenancePageProps {
  params: Promise<{
    number: number;
  }>;
}

export default async function HoseMaintenancePage({
  params,
}: HoseMaintenancePageProps) {
  const { number } = await params;

  const defectDescriptions = ["Einband defekt", "Loch im Schlauch", "..."];

  const success = async () => {
    "use server";
    console.log("check success");
    redirect("/");
  };

  const failed = async (msg: string) => {
    "use server";
    console.log("check failed - reason: ", msg);
    redirect("/");
  };

  return (
    <div className={"flex flex-col gap-5 items-center w-full"}>
      <h2 className={"text-2xl"}>Schlauch {number} reinigen und prüfen</h2>
      <MaintainHoseForm
        defectDescriptions={defectDescriptions}
        onCheckSuccess={success}
        onCheckFailed={failed}
      />
    </div>
  );
}
