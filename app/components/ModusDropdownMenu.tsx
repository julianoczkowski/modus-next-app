"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import { ModusWcDropdownMenu } from "@trimble-oss/moduswebcomponents-react";

export interface ModusDropdownMenuProps {
  children?: ReactNode;
  buttonColor?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
  buttonSize?: "xs" | "sm" | "md" | "lg";
  buttonVariant?: "filled" | "outlined" | "borderless";
  customClass?: string;
  disabled?: boolean;
  menuBordered?: boolean;
  menuOffset?: number;
  menuPlacement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  menuSize?: "sm" | "md" | "lg";
  menuVisible?: boolean;
  onMenuVisibilityChange?: (event: CustomEvent<{ isVisible: boolean }>) => void;
  onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
}

export default function ModusDropdownMenu({
  children,
  buttonColor = "primary",
  buttonSize = "md",
  buttonVariant = "filled",
  customClass,
  disabled = false,
  menuBordered = true,
  menuOffset = 10,
  menuPlacement = "bottom-start",
  menuSize = "md",
  menuVisible = false,
  onMenuVisibilityChange,
  onItemSelect,
}: ModusDropdownMenuProps) {
  const dropdownRef = useRef<HTMLModusWcDropdownMenuElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const handleMenuVisibilityChange = (event: Event) => {
      onMenuVisibilityChange?.(event as CustomEvent<{ isVisible: boolean }>);
    };
    const handleItemSelect = (event: Event) => {
      onItemSelect?.(event as CustomEvent<{ value: string }>);

      // Close the menu after item selection
      const dropdown = dropdownRef.current;
      if (dropdown) {
        dropdown.menuVisible = false;
      }
    };

    if (onMenuVisibilityChange)
      dropdown.addEventListener(
        "menuVisibilityChange",
        handleMenuVisibilityChange
      );
    if (onItemSelect) dropdown.addEventListener("itemSelect", handleItemSelect);

    return () => {
      if (onMenuVisibilityChange)
        dropdown.removeEventListener(
          "menuVisibilityChange",
          handleMenuVisibilityChange
        );
      if (onItemSelect)
        dropdown.removeEventListener("itemSelect", handleItemSelect);
    };
  }, [onMenuVisibilityChange, onItemSelect]);

  return (
    <ModusWcDropdownMenu
      ref={dropdownRef}
      buttonColor={buttonColor}
      buttonSize={buttonSize}
      buttonVariant={buttonVariant}
      customClass={customClass}
      disabled={disabled}
      menuBordered={menuBordered}
      menuOffset={menuOffset}
      menuPlacement={menuPlacement}
      menuSize={menuSize}
      menuVisible={menuVisible}
    >
      {children}
    </ModusWcDropdownMenu>
  );
}
