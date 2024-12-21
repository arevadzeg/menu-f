import React from "react";
import * as SwitchRadix from "@radix-ui/react-switch";
import "./Switch.scss";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onText?: string;
  offText?: string
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, onText, offText }) => (
  <SwitchRadix.Root
    className="SwitchRoot"
    id="switch"
    checked={checked}
    onCheckedChange={onCheckedChange}
  >
    {<div className="switch-text">{checked ? offText : onText}</div>}
    <SwitchRadix.Thumb className="SwitchThumb" />
  </SwitchRadix.Root>
);
