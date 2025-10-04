declare namespace JSX {
  interface IntrinsicElements {
    "modus-wc-button": {
      color?: "primary" | "secondary" | "tertiary" | "warning" | "danger";
      variant?: "filled" | "outlined" | "borderless";
      size?: "xs" | "sm" | "md" | "lg";
      shape?: "rectangle" | "square" | "circle";
      type?: "button" | "submit" | "reset";
      disabled?: boolean;
      "full-width"?: boolean;
      pressed?: boolean;
      "custom-class"?: string;
      onButtonClick?: (event: CustomEvent) => void;
      children?: React.ReactNode;
    };
  }
}
