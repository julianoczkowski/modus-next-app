"use client";

import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function ModusButtonDemo() {
  const handleButtonClick = () => {
    console.log("Modus button clicked!");
    alert("Modus button clicked!");
  };

  return (
    <ModusWcButton
      color="primary"
      variant="filled"
      size="md"
      onButtonClick={handleButtonClick}
    >
      <i
        className="modus-icons"
        style={{ fontSize: "1.2rem", marginRight: "8px" }}
      >
        apps
      </i>
      Test Modus Button
    </ModusWcButton>
  );
}
