"use client";

import { ModusWcModal } from "@trimble-oss/moduswebcomponents-react";
import { ReactNode, useRef, useImperativeHandle, forwardRef } from "react";

interface ModusModalProps {
  // Required
  modalId: string;

  // Behavior
  backdrop?: "default" | "static";
  position?: "top" | "center" | "bottom";
  fullscreen?: boolean;
  showFullscreenToggle?: boolean;
  showClose?: boolean;

  // Content (slots)
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;

  // Accessibility
  ariaLabel?: string;

  // Styling
  customClass?: string;
}

export interface ModusModalRef {
  showModal: () => void;
  close: () => void;
}

const ModusModal = forwardRef<ModusModalRef, ModusModalProps>(
  (
    {
      modalId,
      backdrop = "default",
      position = "center",
      fullscreen = false,
      showFullscreenToggle = false,
      showClose = true,
      header,
      children,
      footer,
      ariaLabel,
      customClass,
    },
    ref
  ) => {
    const modalRef = useRef<any>(null);

    // Expose showModal and close methods to parent component
    useImperativeHandle(ref, () => ({
      showModal: () => {
        if (modalRef.current) {
          modalRef.current.showModal();
        }
      },
      close: () => {
        if (modalRef.current) {
          modalRef.current.close();
        }
      },
    }));

    return (
      <ModusWcModal
        ref={modalRef}
        modal-id={modalId}
        backdrop={backdrop}
        position={position}
        fullscreen={fullscreen}
        show-fullscreen-toggle={showFullscreenToggle}
        show-close={showClose}
        custom-class={customClass}
        aria-label={ariaLabel}
      >
        {header && <span slot="header">{header}</span>}
        <span slot="content">{children}</span>
        {footer && <span slot="footer">{footer}</span>}
      </ModusWcModal>
    );
  }
);

ModusModal.displayName = "ModusModal";

export default ModusModal;
