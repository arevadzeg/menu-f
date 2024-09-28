"use client"; // Add this line
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField as RadixTextField } from "@radix-ui/themes";
import React, { useState } from "react";
// import * as TextField from '@radix-ui/';
import "./TextField.scss";

interface TextFieldProps {
  isCollapsable?: boolean;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  size?: "1" | "2" | "3";
  variant?: "classic" | "surface" | "soft";
  radius?: "none" | "small" | "medium" | "large" | "full";
  color?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  isCollapsable = false,
  placeholder = "Enter text...",
  value,
  onChange,
  size = "2",
  variant = "surface",
  radius = "medium",
  //   color = "",
}) => {
  const [collapsed, setCollapsed] = useState(isCollapsable);

  const handleCollapseClick = () => {
    if (isCollapsable) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div>
      {/* {collapsed && isCollapsable ? (
        <button onClick={handleCollapseClick}>Expand Input</button>
      ) :  */}

      {/* ( */}
      <RadixTextField.Root
        size={size}
        variant={variant}
        radius={radius}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: collapsed ? 33 : "100%",
          maxWidth: collapsed ? 33 : "500px",
          overflow: "hidden",
          transition: "max-width 300ms ease",
        }}
      >
        <RadixTextField.Slot>
          <MagnifyingGlassIcon
            height="16"
            width="16"
            onClick={() => setCollapsed((prev) => !prev)}
          />
        </RadixTextField.Slot>
      </RadixTextField.Root>
      {/* )} */}
    </div>
  );
};

export default TextField;
