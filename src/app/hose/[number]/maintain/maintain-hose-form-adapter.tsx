"use client";

import { toast } from "sonner";
import MaintainHoseForm from "@/app/_components/maintain-hose-form";
import { FireHose } from "@/lib/types";
import { createMaintenance } from "@/lib/maintenanceRepository";
import { createFirehoseSlug } from "@/lib/navigationUtils";
import { useRouter } from "next/navigation";

interface MaintainHoseFormAdapterProps {
  firehose: FireHose;
}

export default function MaintainHoseFormAdapter({
  firehose,
}: MaintainHoseFormAdapterProps) {
  const router = useRouter();

  const defectDescriptions = [
    "Einband defekt",
    "Loch im Schlauch",
    "sonstiges",
  ];

  const success = async () => {
    console.log("check succeeded", firehose.number, firehose.owner);

    await createMaintenance({
      fireHoseId: firehose.id,
      testPassed: true,
      failureDescription: null,
      timestamp: new Date(),
    });
    toast.success("Prüfergebnis gespeichert", {
      description: `Schlauch ${firehose.owner.marker}-${firehose.number} hat die Prüfung bestanden`,
    });
    console.log("maintenance saved", firehose.number);
    router.push("/");
  };

  const failed = async (msg: string, navigateToHoseDetails: boolean) => {
    console.log("check failed - reason: ", msg);
    await createMaintenance({
      fireHoseId: firehose.id,
      testPassed: false,
      failureDescription: msg,
      timestamp: new Date(),
    });
    toast.success("Prüfergebnis gespeichert", {
      description: `Schlauch ${firehose.owner.marker}-${firehose.number}: ${msg}`,
    });
    if (navigateToHoseDetails) {
      router.push(`/hose/${createFirehoseSlug(firehose)}`);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <MaintainHoseForm
        defectDescriptions={defectDescriptions}
        firehose={firehose}
        onCheckSuccess={success}
        onCheckFailed={failed}
        onCancel={router.back}
      />
    </>
  );
}
