"use client";

import TouchButton from "@/app/_components/touch-button";
import Numpad from "@/app/_components/numpad";
import { useState } from "react";

export interface EditLengthFormProps {
  currentLength: number;
  onSave: (newLength: number) => void;
  onCancel: () => void;
}

export default function EditLengthForm({
  currentLength,
  onSave,
  onCancel,
}: EditLengthFormProps) {
  const [newLengthStr, setNewLengthStr] = useState("");

  const handleSave = () => {
    const newLength = parseInt(newLengthStr) || currentLength;
    onSave(newLength);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">Schlauchlänge bearbeiten</h1>
      <div className="text-center">
        <p className="text-lg text-gray-600 mb-4">
          Aktuelle Länge: {currentLength}m
        </p>
        <div className="flex flex-row gap-3 h-20 items-center">
          <span
            className={
              "block font-bold text-center text-3xl min-w-40 h-full border-2 p-5"
            }
          >
            {newLengthStr}
          </span>
          <span className="inline-block text-3xl">m</span>
        </div>
      </div>
      <Numpad onValueChange={setNewLengthStr} />
      <div className="flex gap-4 mt-6">
        <TouchButton label="Abbrechen" onClick={onCancel} />
        <TouchButton
          label="Speichern"
          primary
          onClick={handleSave}
          disabled={!newLengthStr || parseInt(newLengthStr) <= 0}
        />
      </div>
    </div>
  );
}
