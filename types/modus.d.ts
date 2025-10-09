declare global {
  namespace JSX {
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
    "modus-wc-theme-provider": {
      "initial-theme"?: string;
      children?: React.ReactNode;
    };
    "modus-wc-theme-switcher": {
      "aria-label"?: string;
      onThemeChange?: (event: CustomEvent<{ name: string }>) => void;
      children?: React.ReactNode;
    };
    "modus-wc-dropdown-menu": {
      "button-color"?:
        | "primary"
        | "secondary"
        | "tertiary"
        | "warning"
        | "danger";
      "button-size"?: "xs" | "sm" | "md" | "lg";
      "button-variant"?: "filled" | "outlined" | "borderless";
      "custom-class"?: string;
      disabled?: boolean;
      "menu-bordered"?: boolean;
      "menu-offset"?: number;
      "menu-placement"?:
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
      "menu-size"?: "sm" | "md" | "lg";
      "menu-visible"?: boolean;
      onMenuVisibilityChange?: (
        event: CustomEvent<{ isVisible: boolean }>
      ) => void;
      onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
      children?: React.ReactNode;
    };
    "modus-wc-menu-item": {
      bordered?: boolean;
      "custom-class"?: string;
      disabled?: boolean;
      focused?: boolean;
      label: string;
      selected?: boolean;
      size?: "sm" | "md" | "lg";
      "start-icon"?: string;
      "sub-label"?: string;
      value: string;
      onItemSelect?: (event: CustomEvent<{ value: string }>) => void;
      children?: React.ReactNode;
    };
    "modus-wc-pagination": {
      "aria-label"?: string;
      ariaLabelValues?: {
        firstPage?: string;
        previousPage?: string;
        page?: string;
        nextPage?: string;
        lastPage?: string;
      };
      count?: number;
      "custom-class"?: string;
      nextButtonText?: string;
      page?: number;
      prevButtonText?: string;
      size?: "sm" | "md" | "lg";
      onPageChange?: (
        event: CustomEvent<{ newPage: number; prevPage: number }>
      ) => void;
      children?: React.ReactNode;
    };
    "modus-wc-progress": {
      "aria-label"?: string;
      "custom-class"?: string;
      indeterminate?: boolean;
      label?: string;
      max?: number;
      value?: number;
      variant?: "default" | "radial";
      children?: React.ReactNode;
    };
  }
}

// Add HTML element types for Modus Web Components
declare global {
  interface HTMLElementTagNameMap {
    "modus-wc-dropdown-menu": HTMLModusWcDropdownMenuElement;
    "modus-wc-menu-item": HTMLModusWcMenuItemElement;
    "modus-wc-button": HTMLModusWcButtonElement;
    "modus-wc-pagination": HTMLModusWcPaginationElement;
    "modus-wc-progress": HTMLModusWcProgressElement;
  }
}

interface HTMLModusWcDropdownMenuElement extends HTMLElement {
  menuVisible: boolean;
  addEventListener(type: "itemSelect", listener: (event: CustomEvent) => void): void;
  removeEventListener(type: "itemSelect", listener: (event: CustomEvent) => void): void;
}

interface HTMLModusWcMenuItemElement extends HTMLElement {
  label: string;
  value: string;
  selected: boolean;
}

interface HTMLModusWcButtonElement extends HTMLElement {
  color: string;
  variant: string;
  size: string;
}

interface HTMLModusWcPaginationElement extends HTMLElement {
  page: number;
  count: number;
  addEventListener(
    type: "pageChange",
    listener: (event: CustomEvent<{ newPage: number; prevPage: number }>) => void
  ): void;
  removeEventListener(
    type: "pageChange",
    listener: (event: CustomEvent<{ newPage: number; prevPage: number }>) => void
  ): void;
}

interface HTMLModusWcProgressElement extends HTMLElement {
  value: number;
  max: number;
  indeterminate: boolean;
  variant: "default" | "radial";
}
}
