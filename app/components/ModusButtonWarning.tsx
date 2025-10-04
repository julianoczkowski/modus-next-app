"use client";

import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function ModusButtonWarning() {
  const handleButtonClick = () => {
    console.log("Warning button clicked!");
    alert("Warning button clicked!");
  };

  return (
    <ModusWcButton
      color="warning"
      variant="filled"
      size="md"
      onButtonClick={handleButtonClick}
    >
      <i
        className="modus-icons"
        style={{ fontSize: "1.2rem", marginRight: "8px" }}
      >
        warning
      </i>
      Warning
    </ModusWcButton>
  );
}
