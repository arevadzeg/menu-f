import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";
import "./Dropdown.scss";

// Define the default interface for dropdown menu items
export interface DefaultDropdownMenuItem {
  value: string; // Value of the dropdown item
  label: string; // Label of the dropdown item
  icon?: () => JSX.Element; // Optional icon (can be JSX.Element for better type)
}

// DropdownMenuProps interface with a generic type and a default type
interface DropdownMenuProps<
  OptionType extends DefaultDropdownMenuItem = DefaultDropdownMenuItem
> {
  options: OptionType[]; // Options array
  selectedValue: string | number | null; // Currently selected value
  onChange: (option: OptionType | null) => void;
  Trigger?: () => JSX.Element; // Optional trigger component
}

const DropdownMenuComponent = <OptionType extends DefaultDropdownMenuItem>({
  options,
  selectedValue,
  onChange,
  Trigger,
}: DropdownMenuProps<OptionType>) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {Trigger ? (
          <button>
            <Trigger />
          </button>
        ) : (
          <button className="IconButton" aria-label="Customise options">
            <HamburgerMenuIcon />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {options.map((item, index) => (
            <DropdownMenu.CheckboxItem
              key={index}
              className="DropdownMenuCheckboxItem"
              checked={item.value === selectedValue}
              onCheckedChange={(e) => {
                if (e) {
                  onChange(item);
                } else {
                  onChange(null);
                }
              }}
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {item.label}{" "}
              {/* This will now work as TypeScript knows item has a label */}
              {item.icon && (
                <div className="RightSlot">
                  <item.icon />
                </div>
              )}{" "}
              {/* Assuming icon is a JSX.Element */}
            </DropdownMenu.CheckboxItem>
          ))}

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuComponent;
