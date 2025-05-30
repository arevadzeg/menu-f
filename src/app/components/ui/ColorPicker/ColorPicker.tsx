import React from "react";
import { HexColorPicker } from "react-colorful";
import type { ComponentProps } from "react";

type ColorPickerProps = ComponentProps<typeof HexColorPicker>;

const ColorPicker: React.FC<ColorPickerProps> = (props) => {
  return <HexColorPicker {...props} />;
};

export default ColorPicker;
