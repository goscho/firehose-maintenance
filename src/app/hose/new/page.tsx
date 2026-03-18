"use client";

import { useRouter } from "next/navigation";
import NewHoseForm from "@/app/_components/new-hose-form";
import { FireHose } from "@/lib/types";
import {
  createFireHose,
  findMinFreeHoseNumber,
} from "@/lib/fireHoseRepository";
import { useEffect, useState } from "react";
import { OWNER_MURRHARDT } from "@/lib/static";
import { createFirehoseSlug } from "@/lib/navigationUtils";
import { toast } from "sonner";

export default function NewHosePage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [freeNumber, setFreeNumber] = useState<number | null>(null);
  const [freeNumberLoading, setFreeNumberLoading] = useState(false);

  // Load free number when page loads
  useEffect(() => {
    const loadFreeNumber = async () => {
      setFreeNumberLoading(true);
      try {
        // Using the hardcoded owner ID from the form
        const number = await findMinFreeHoseNumber(OWNER_MURRHARDT.id);
        setFreeNumber(number);
      } catch (err) {
        console.error("Error loading free number:", err);
      } finally {
        setFreeNumberLoading(false);
      }
    };
    loadFreeNumber();
  }, []);

  // Handle form submission
  const handleSubmit = async (data: FireHose) => {
    console.log("Submitting new hose:", data);

    try {
      await createFireHose({
        number: data.number!,
        ownerId: data.owner!.id,
        length: data.length!,
        diameter: data.diameter!,
        commissionedAt: data.commissionedAt!,
      });
      toast.success("Schlauch erfolgreich gespeichert", {
        description: `Neuer Schlauch ${data.owner!.marker}-${data.number} wurde angelegt`,
      });
      router.push(
        `/hose/${createFirehoseSlug({ number: data.number!, owner: data.owner! })}`,
      );
    } catch (err) {
      setError("Fehler beim Erstellen des Schlauchs. " + err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold">Neuen Schlauch anlegen</h1>
      {error && <p className="text-red-500">{error}</p>}
      <NewHoseForm
        onSubmit={handleSubmit}
        onCancel={router.back}
        freeNumber={freeNumber}
        freeNumberLoading={freeNumberLoading}
      />
    </main>
  );
}
