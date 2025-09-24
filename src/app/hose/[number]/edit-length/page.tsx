import EditLengthForm from "@/app/_components/edit-length-form";
import { redirect } from "next/navigation";
import {
  getFireHoseByNumberAndOwner,
  updateFireHose,
} from "@/lib/fireHoseRepository";
import { requireAuth } from "@/lib/requireAuth";

export interface HoseLengthEditPageProps {
  params: Promise<{
    number: string;
  }>;
}

export default async function HoseLengthEditPage({
  params,
}: HoseLengthEditPageProps) {
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
    console.log(`firehose ${number} not found`);
    redirect("/");
  }

  const handleSave = async (newLength: number) => {
    "use server";
    console.log("updating length", firehose.id, newLength);

    await updateFireHose(firehose.id, { length: newLength });
    console.log("length updated", number);
    redirect(`/hose/${encodeURIComponent(number)}`);
  };

  const handleCancel = async () => {
    "use server";
    redirect(`/hose/${encodeURIComponent(number)}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <EditLengthForm
        currentLength={firehose.length}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </main>
  );
}
