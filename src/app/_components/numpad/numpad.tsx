"use client";

import TouchButton from "@/app/_components/touch-button";
import { useEffect, useState } from "react";

export interface NumpadProps {
  initialValue?: string;
  onValueChange?: (value: string) => void;
}

export default function Numpad({
  initialValue = "",
  onValueChange,
}: NumpadProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const updateValue = (newValue: string) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const addDigit = (digit: number): void => {
    updateValue(value + String(digit));
  };

  const deleteRightDigit = (): void => {
    const newLength = value.length - 1;
    updateValue(value.substring(0, newLength));
  };

  const numbers = new Array(10).fill(1).map((_, i) => (i + 1) % 10);

  return (
    <div className="grid grid-cols-3 gap-2 w-72">
      {numbers.map((num) => (
        <TouchButton
          key={num}
          label={String(num)}
          onClick={() => addDigit(num)}
          primary
        />
      ))}
      <TouchButton label={"DEL"} onClick={() => deleteRightDigit()} />
      <TouchButton label={"AC"} onClick={() => updateValue("")} />
    </div>
  );
}
