// eslint-disable-next-line import/no-extraneous-dependencies
import * as Dialog from '@radix-ui/react-dialog';
import { Spinner } from '@radix-ui/themes';

interface BackdropProps {
  open: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ open }) => (
  <Dialog.Root open={open}>
    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]">
      <div className="flex justify-center items-center">
        <Spinner size="3" />
      </div>
    </Dialog.Overlay>
  </Dialog.Root>
);

export default Backdrop;
