import { Button, ButtonProps } from '@radix-ui/themes';
import './RadixButton.scss';

function RadixButton({ ...props }: ButtonProps) {
  return <Button {...props} id="button" />;
}

export default RadixButton;
