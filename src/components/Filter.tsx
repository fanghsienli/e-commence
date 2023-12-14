"use client";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Filter({ title, children }: Props) {
  return (
    <div className="border-b pb-4">
      <p className="font-medium mb-4">{title}</p>
      <div className="space-y-2 grid grid-cols-2 md:grid-cols-1">
        {children}
      </div>
    </div>
  );
}
