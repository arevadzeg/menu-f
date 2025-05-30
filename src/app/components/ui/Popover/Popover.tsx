import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon } from '@radix-ui/react-icons';
import './Popover.scss';

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  content: JSX.Element;
  children: JSX.Element;
}

const PopoverDemo = ({ open, onClose, content, children }: PopoverProps) => (
  <Popover.Root open={open} onOpenChange={(open) => !open && onClose()}>
    <Popover.Trigger asChild>{children}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>
        {content}

        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopoverDemo;
