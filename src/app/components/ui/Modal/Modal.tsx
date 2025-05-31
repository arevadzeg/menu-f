'use client';

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './Modal.scss';
import { VisuallyHidden } from '@radix-ui/themes';

interface ModalProps {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  contentClassName?: string;
}

function Modal({
  children, isOpen, onClose, contentClassName,
}: ModalProps) {
  const [elementToMountModal, setElementToMountModal] = useState<Element | null>(null);

  useEffect(() => {
    setElementToMountModal(document.querySelector('.radix-themes'));
  }, []);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal container={elementToMountModal}>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className={`DialogContent ${contentClassName}`}>
          <VisuallyHidden>
            <Dialog.DialogTitle />
          </VisuallyHidden>

          {children}
          <Dialog.Close asChild onClick={onClose}>
            <button className="IconButton" aria-label="Close" type="button">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
