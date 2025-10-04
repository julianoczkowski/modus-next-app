"use client";

import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function ModusButtonSecondary() {
  const handleButtonClick = () => {
    console.log("Secondary button clicked!");
    alert("Secondary button clicked!");
  };

  return (
    <ModusWcButton
      color="secondary"
      variant="outlined"
      size="md"
      onButtonClick={handleButtonClick}
    >
      <i
        className="modus-icons"
        style={{ fontSize: "1.2rem", marginRight: "8px" }}
      >
        download
      </i>
      Download
    </ModusWcButton>
  );
}
