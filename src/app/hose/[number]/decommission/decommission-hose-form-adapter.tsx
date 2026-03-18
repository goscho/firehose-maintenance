"use client";

import DecommissionHoseForm from "@/app/_components/decommission-hose-form";
import { FireHose } from "@/lib/types";
import { useRouter } from "next/navigation";
import { decommissionFireHose } from "@/lib/fireHoseRepository";
import { toast } from "sonner";

interface DecommissionHoseFormAdapterProps {
  firehose: FireHose;
}

export default function DecommissionHoseFormAdapter({
  firehose,
}: DecommissionHoseFormAdapterProps) {
  const router = useRouter();

  const handleDecommission = async () => {
    console.log("decommissioning hose", firehose.id);
    await decommissionFireHose(firehose.id);
    toast.success("Schlauch Ausgemustert", {
      description: `Schlauch ${firehose.owner.marker}-${firehose.number} ist nicht mehr im Dienst`,
    });
    router.push("/");
  };

  return (
    <DecommissionHoseForm
      firehose={firehose}
      onCancel={router.back}
      onDecommission={handleDecommission}
    />
  );
}
