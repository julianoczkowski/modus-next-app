"use client";

import { ModusWcButton } from "@trimble-oss/moduswebcomponents-react";

export default function ModusButtonDanger() {
  const handleButtonClick = () => {
    console.log("Danger button clicked!");
    alert("Danger button clicked!");
  };

  return (
    <ModusWcButton
      color="danger"
      variant="borderless"
      size="md"
      onButtonClick={handleButtonClick}
    >
      <i
        className="modus-icons"
        style={{ fontSize: "1.2rem", marginRight: "8px" }}
      >
        delete
      </i>
      Delete
    </ModusWcButton>
  );
}
