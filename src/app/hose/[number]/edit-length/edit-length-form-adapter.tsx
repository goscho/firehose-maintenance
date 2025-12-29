"use client";

import EditLengthForm from "@/app/_components/edit-length-form";
import { useRouter } from "next/navigation";
import { updateFireHose } from "@/lib/fireHoseRepository";
import { FireHose } from "@/lib/types";
import { toast } from "sonner";

interface EditLengthFormAdapterProps {
  firehose: FireHose;
}

export default function EditLengthFormAdapter({
  firehose,
}: EditLengthFormAdapterProps) {
  const router = useRouter();

  const handleSave = async (newLength: number) => {
    await updateFireHose(firehose.id, { length: newLength });
    toast.success("Neue Länge gespeichert", {
      description: `Schlauch ${firehose.owner.marker}-${firehose.number} ist jetzt ${newLength}\u00A0m lang`,
    });
    router.back();
  };

  return (
    <EditLengthForm
      currentLength={firehose.length}
      onSave={handleSave}
      onCancel={router.back}
    />
  );
}
