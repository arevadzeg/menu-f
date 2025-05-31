import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HamburgerMenuIcon, CheckIcon } from '@radix-ui/react-icons';
import './Dropdown.scss';

export interface DefaultDropdownMenuItem {
  value: string;
  label: string;
  icon?: () => JSX.Element;
}

interface DropdownMenuProps<
  OptionType extends DefaultDropdownMenuItem = DefaultDropdownMenuItem,
> {
  options: OptionType[];
  selectedValue: string | number | null;
  onChange: (option: OptionType | null) => void;
  Trigger?: () => JSX.Element;
}

function DropdownMenuComponent<OptionType extends DefaultDropdownMenuItem>({
  options,
  selectedValue,
  onChange,
  Trigger,
}: DropdownMenuProps<OptionType>) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {Trigger ? (
          <button type="button">
            <Trigger />
          </button>
        ) : (
          <button className="IconButton" aria-label="Customise options" type="button">
            <HamburgerMenuIcon />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {options.map((item) => (
            <DropdownMenu.CheckboxItem
              key={item.value}
              className="DropdownMenuCheckboxItem"
              checked={item.value === selectedValue}
              onCheckedChange={(event) => {
                if (event) {
                  onChange(item);
                } else {
                  onChange(null);
                }
              }}
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {item.label}
              {' '}
              {item.icon && (
                <div className="RightSlot">
                  <item.icon />
                </div>
              )}
              {' '}
            </DropdownMenu.CheckboxItem>
          ))}

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default DropdownMenuComponent;
