import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Popover from '@radix-ui/react-popover';
import './Popover.scss';

interface PopoverProps {
  open: boolean;
  onClose: () => void;
  content: JSX.Element;
  children: JSX.Element;
}

function PopoverDemo({
  open, onClose, content, children,
}: PopoverProps) {
  return (
    <Popover.Root open={open} onOpenChange={(popoverState) => !popoverState && onClose()}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="PopoverContent" sideOffset={5}>
          {content}

          <Popover.Arrow className="PopoverArrow" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default PopoverDemo;
