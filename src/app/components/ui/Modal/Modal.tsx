"use client"; // Add this line
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./Modal.scss";
import { VisuallyHidden } from "@radix-ui/themes";

interface ModalProps {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const elementToMountModal = document.querySelector(".radix-themes");

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal container={elementToMountModal}>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <VisuallyHidden>
            <Dialog.DialogTitle></Dialog.DialogTitle>
          </VisuallyHidden>

          {children}
          <Dialog.Close asChild onClick={onClose}>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
