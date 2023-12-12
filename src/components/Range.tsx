"use client";
import React, { useState, ChangeEvent, useEffect } from "react";

type Props = {
  onValueChange: (newValue: number) => void;
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  step?: number;
  digits?: number;
  delay?: number;
};

export default function Range({
  onValueChange,
  defaultValue = 0,
  maxValue = 100,
  minValue = 0,
  step = 1,
  digits = 0,
  delay = 100,
}: Props) {
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setIsValueChanged(true);
    setValue(newValue);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isValueChanged) {
        onValueChange(value);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value]);

  useEffect(() => {
    setIsValueChanged(false);
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="w-auto mx-auto mt-8">
      <input
        type="range"
        min={minValue}
        max={maxValue}
        step={step}
        value={value}
        onChange={handleInputChange}
        className="w-full"
      />
      <div className="mt-4 text-center">
        <span className="text-lg font-semibold">{value?.toFixed(digits)}</span>
      </div>
    </div>
  );
}
