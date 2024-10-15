import { Button, ButtonProps } from "@radix-ui/themes";
import "./RadixButton.scss";

const RadixButton = ({ ...props }: ButtonProps) => {
  return <Button {...props} id="button" />;
};

export default RadixButton;
