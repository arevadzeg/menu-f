import React from "react";
import * as SwitchRadix from "@radix-ui/react-switch";
import "./Switch.scss";

interface SwitchProps {
  checked: boolean; // Controlled state
  onCheckedChange: (checked: boolean) => void; // Callback for state change
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => (
  <SwitchRadix.Root
    className="SwitchRoot"
    id="switch"
    checked={checked}
    onCheckedChange={onCheckedChange}
  >
    <SwitchRadix.Thumb className="SwitchThumb" />
  </SwitchRadix.Root>
);
