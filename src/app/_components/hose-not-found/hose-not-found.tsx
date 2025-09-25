import Link from "next/link";
import TouchButton from "@/app/_components/touch-button";

export interface HoseNotFoundProps {
  ownerMarker: string;
  hoseNumber: string;
}
export default function HoseNotFound({
  ownerMarker,
  hoseNumber,
}: HoseNotFoundProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="text-2xl text-center p-5 w-full">
        Schlauch {ownerMarker}-{hoseNumber} nicht gefunden
      </div>
      <Link href={"/"}>
        <TouchButton label={"Anderen Schlauch wählen"} primary />
      </Link>
    </div>
  );
}
