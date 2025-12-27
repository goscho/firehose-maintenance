import EditLengthForm from "@/app/_components/edit-length-form";
import { redirect } from "next/navigation";
import { createFirehoseSlug, parseFirehoseSlug } from "@/lib/navigationUtils";
import {
  getFireHoseByNumberAndOwner,
  updateFireHose,
} from "@/lib/fireHoseRepository";

export interface HoseLengthEditPageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HoseLengthEditPage({
  params,
}: HoseLengthEditPageProps) {
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

  const handleSave = async (newLength: number) => {
    "use server";
    console.log("updating length", firehose.id, newLength);

    await updateFireHose(firehose.id, { length: newLength });
    console.log("length updated", number);
    redirect(`/hose/${createFirehoseSlug(firehose)}`);
  };

  const handleCancel = async () => {
    "use server";
    redirect(`/hose/${createFirehoseSlug(firehose)}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-3xl font-bold">
        Länge von Schlauch {firehose.owner.marker}-{firehose.number} bearbeiten
      </h1>
      <EditLengthForm
        currentLength={firehose.length}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </main>
  );
}
