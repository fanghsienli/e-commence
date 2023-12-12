"use client";
import type { ComponentPropsWithoutRef } from "react";

type Props = {
  label: string;
} & ComponentPropsWithoutRef<"input">;

export default function Checkbox({ id, label, ...props }: Props) {
  return (
    <div className="flex items-center gap-4">
      <input id={id} className="w-4 h-4 shrink-0" {...props} />
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
    </div>
  );
}
