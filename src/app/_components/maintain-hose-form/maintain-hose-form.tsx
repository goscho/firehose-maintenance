"use client";

import TouchButton from "@/app/_components/touch-button";
import { useState } from "react";
import SuggestedValuesInput from "@/app/_components/suggested-values-input";
import { FireHose } from "@/lib/types";

export interface MaintainHoseFormProps {
  defectDescriptions: string[];
  firehose: FireHose;
  onCheckSuccess?: () => void;
  onCheckFailed?: (msg: string, navigateToHoseDetails: boolean) => void;
  onCancel?: () => void;
}

export default function MaintainHoseForm({
  defectDescriptions,
  firehose,
  onCheckSuccess,
  onCheckFailed,
  onCancel,
}: MaintainHoseFormProps) {
  const [defectFound, setDefectFound] = useState(false);
  const [defectDescription, setDefectDescription] = useState("");

  const Header = (
    <div className="text-2xl flex flex-col gap-2 w-full max-w-md">
      <div className="flex flex-row justify-between border-b pb-2 px-3">
        <span className="font-bold">Nummer:</span>
        <span>{firehose.number}</span>
      </div>
      <div className="flex flex-row justify-between border-b pb-2 px-3">
        <span className="font-bold">Eigentümer:</span>
        <span>{firehose.owner.name}</span>
      </div>
      <div className="flex flex-row justify-between pb-2 px-3">
        <span className="font-bold">Maße:</span>
        <span>
          {firehose.diameter} {firehose.length}m
        </span>
      </div>
    </div>
  );

  if (!defectFound) {
    return (
      <div className={"flex flex-col gap-5 items-center w-full"}>
        {Header}
        <div className={"flex flex-col gap-3 w-full max-w-md"}>
          <TouchButton
            label={"Prüfung bestanden"}
            primary
            disabled={defectFound}
            onClick={onCheckSuccess}
            aria-label="Confirm successful check"
            data-testid="success-button"
          />
          <TouchButton
            label={"Schlauch defekt"}
            disabled={defectFound}
            onClick={() => setDefectFound(true)}
          />
          <div className={"h-12"}></div>
          <TouchButton
            label={"Abbrechen"}
            disabled={defectFound}
            onClick={onCancel}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={"flex flex-col gap-5 items-center w-full"}>
        {Header}
        <div className={"flex flex-col gap-3 w-full max-w-md"}>
          <SuggestedValuesInput
            className={"flex flex-row gap-1"}
            suggestedValues={defectDescriptions}
            onValueChange={(value) => {
              setDefectDescription(value);
            }}
            data-testid="defect-input"
            aria-label="Defect description input"
            role="combobox"
          />
        </div>
        <div className={"flex flex-row gap-3 justify-end w-full max-w-xl"}>
          <TouchButton label={"zurück"} onClick={() => setDefectFound(false)} />
          <TouchButton
            label={"Speichern"}
            onClick={() =>
              onCheckFailed && onCheckFailed(defectDescription, false)
            }
          />
          <TouchButton
            label={"Speichern & bearbeiten"}
            primary
            onClick={() =>
              onCheckFailed && onCheckFailed(defectDescription, true)
            }
          />
        </div>
      </div>
    );
  }
}
