import TouchButton from "@/app/_components/touch-button";
import HoseDetails from "@/app/_components/hose-details";
import { FireHose } from "@/lib/types";

export interface DecommissionHoseFormProps {
  firehose: FireHose;
  onCancel: () => void | Promise<void>;
  onDecommission: () => void | Promise<void>;
}

export default function DecommissionHoseForm({
  firehose,
  onCancel,
  onDecommission,
}: DecommissionHoseFormProps) {
  return (
    <div className={"flex min-h-screen flex-col items-center"}>
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 mb-5 rounded max-w-xl text-center text-xl">
        <p className="font-medium mb-2">
          Möchten Sie diesen Schlauch wirklich ausmustern?
        </p>
        <p className="text-lg">
          Diese Aktion kann nicht rückgängig gemacht werden!
        </p>
      </div>
      <HoseDetails firehose={firehose} />
      <div className="flex gap-4 mt-6">
        <form action={onCancel}>
          <TouchButton label="Abbrechen" type="submit" />
        </form>
        <form action={onDecommission}>
          <TouchButton label="Ausmustern" type="submit" primary />
        </form>
      </div>
    </div>
  );
}
