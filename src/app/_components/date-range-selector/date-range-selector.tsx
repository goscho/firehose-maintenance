"use client";

import { useState } from "react";
import TouchButton from "@/app/_components/touch-button";

export type DateRangePreset = "lastYear" | "thisYear" | "custom";

export interface DateRangeSelectorProps {
  onRangeChange: (startDate: Date, endDate: Date) => void;
  initialPreset?: DateRangePreset;
  initialStartDate?: Date;
  initialEndDate?: Date;
  className?: string;
}

function getPresetDates(preset: DateRangePreset): { start: Date; end: Date } {
  const now = new Date();
  const currentYear = now.getUTCFullYear();

  switch (preset) {
    case "lastYear": {
      const start = new Date(Date.UTC(currentYear - 1, 0, 1, 0, 0, 0, 0));
      const end = new Date(Date.UTC(currentYear - 1, 11, 31, 23, 59, 59, 999));
      return { start, end };
    }
    case "thisYear": {
      const start = new Date(Date.UTC(currentYear, 0, 1, 0, 0, 0, 0));
      const end = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          23,
          59,
          59,
          999,
        ),
      );
      return { start, end };
    }
    default:
      return {
        start: new Date(Date.UTC(currentYear, 0, 1, 0, 0, 0, 0)),
        end: new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            23,
            59,
            59,
            999,
          ),
        ),
      };
  }
}

function formatDateForInput(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function DateRangeSelector({
  onRangeChange,
  initialPreset = "lastYear",
  initialStartDate,
  initialEndDate,
  className,
}: DateRangeSelectorProps) {
  const [selectedPreset, setSelectedPreset] =
    useState<DateRangePreset>(initialPreset);
  const [customStartDate, setCustomStartDate] = useState<string>(
    initialStartDate
      ? formatDateForInput(initialStartDate)
      : formatDateForInput(getPresetDates("lastYear").start),
  );
  const [customEndDate, setCustomEndDate] = useState<string>(
    initialEndDate
      ? formatDateForInput(initialEndDate)
      : formatDateForInput(new Date()),
  );

  const handlePresetClick = (preset: DateRangePreset) => {
    setSelectedPreset(preset);
    if (preset !== "custom") {
      const { start, end } = getPresetDates(preset);
      onRangeChange(start, end);
    }
  };

  const handleCustomDateChange = () => {
    if (customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      start.setUTCHours(0, 0, 0, 0);
      const end = new Date(customEndDate);
      end.setUTCHours(23, 59, 59, 999);
      onRangeChange(start, end);
    }
  };

  const classNames = ["flex", "flex-col", "gap-4"];
  if (className) {
    classNames.push(className);
  }

  const presetButtonClass = (preset: DateRangePreset) =>
    selectedPreset === preset ? "ring-2 ring-indigo-500 ring-offset-2" : "";

  return (
    <div className={classNames.join(" ")}>
      <div className="flex flex-wrap gap-3">
        <TouchButton
          label="Letztes Jahr"
          primary={selectedPreset === "lastYear"}
          onClick={() => handlePresetClick("lastYear")}
          className={presetButtonClass("lastYear")}
        />
        <TouchButton
          label="Dieses Jahr"
          primary={selectedPreset === "thisYear"}
          onClick={() => handlePresetClick("thisYear")}
          className={presetButtonClass("thisYear")}
        />
        <TouchButton
          label="Eigener Zeitraum"
          primary={selectedPreset === "custom"}
          onClick={() => handlePresetClick("custom")}
          className={presetButtonClass("custom")}
        />
      </div>

      {selectedPreset === "custom" && (
        <div className="flex flex-wrap items-end gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="start-date"
              className="text-lg font-medium text-gray-700"
            >
              Von
            </label>
            <input
              type="date"
              id="start-date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
              className="p-4 text-xl border border-gray-300 rounded-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="end-date"
              className="text-lg font-medium text-gray-700"
            >
              Bis
            </label>
            <input
              type="date"
              id="end-date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
              className="p-4 text-xl border border-gray-300 rounded-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <TouchButton
            label="Anwenden"
            primary
            onClick={handleCustomDateChange}
            disabled={!customStartDate || !customEndDate}
          />
        </div>
      )}
    </div>
  );
}
