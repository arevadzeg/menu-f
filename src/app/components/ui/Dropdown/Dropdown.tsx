import React, { Dispatch, SetStateAction } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, CheckIcon } from "@radix-ui/react-icons";
import "./Dropdown.scss";

interface DropdownMenuItem {
  label: string;
  icon?: () => JSX.Element;
  disabled?: boolean;
  onChange?: () => void;
  value: string | number;
}

interface DropdownMenuProps {
  options: DropdownMenuItem[];
  selectedValue: string | number | null;
  setSelectedValue: Dispatch<SetStateAction<string | number | null>>;
  Trigger?: () => JSX.Element;
}

const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({
  options,
  selectedValue,
  setSelectedValue,
  Trigger,
}) => {
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
                  setSelectedValue(item.value);
                } else {
                  setSelectedValue(null);
                }
              }}
            >
              <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {item.label}
              {item.icon && <div className="RightSlot">{<item.icon />}</div>}
            </DropdownMenu.CheckboxItem>
          ))}

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuComponent;
