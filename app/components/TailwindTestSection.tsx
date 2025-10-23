"use client";

import { ReactNode } from "react";

interface TailwindTestSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function TailwindTestSection({
  title,
  description,
  children,
}: TailwindTestSectionProps) {
  return (
    <div className="bg-card p-6 rounded-lg border-default">
      <div className="flex flex-col gap-2 mb-6">
        <div className="text-xl font-semibold text-foreground">{title}</div>
        <div className="text-base text-foreground opacity-80 max-w-3xl">
          {description}
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
