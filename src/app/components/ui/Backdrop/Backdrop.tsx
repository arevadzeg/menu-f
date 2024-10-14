import * as Dialog from "@radix-ui/react-dialog";
import "./Backdrop.scss";
import { Spinner } from "@radix-ui/themes";

interface BackdropProps {
  open: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ open }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay className="backdrop-overlay">
        <div className="backdrop-content">
          <Spinner size={"3"} />
        </div>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};

export default Backdrop;
