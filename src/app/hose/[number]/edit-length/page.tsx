import { redirect } from "next/navigation";
import { parseFirehoseSlug } from "@/lib/navigationUtils";
import { getFireHoseByNumberAndOwner } from "@/lib/fireHoseRepository";
import EditLengthFormAdapter from "@/app/hose/[number]/edit-length/edit-length-form-adapter";

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

  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-3xl font-bold">
        Länge von Schlauch {firehose.owner.marker}-{firehose.number} bearbeiten
      </h1>
      <EditLengthFormAdapter firehose={firehose} />
    </main>
  );
}
