"use client";

import "@trimble-oss/moduswebcomponents-react/modus-wc-styles.css";

export default function ModusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
