"use client";

import React from "react";
import { ModusWcProgress } from "@trimble-oss/moduswebcomponents-react";

export interface ModusProgressProps {
  ariaLabel?: string;
  customClass?: string;
  indeterminate?: boolean;
  label?: string;
  max?: number;
  value?: number;
  variant?: "default" | "radial";
  children?: React.ReactNode;
}

export default function ModusProgress({
  ariaLabel,
  customClass,
  indeterminate = false,
  label,
  max = 100,
  value = 0,
  variant = "default",
  children,
}: ModusProgressProps) {
  return (
    <ModusWcProgress
      aria-label={ariaLabel}
      custom-class={customClass}
      indeterminate={indeterminate}
      label={label}
      max={max}
      value={value}
      variant={variant}
    >
      {children}
    </ModusWcProgress>
  );
}
