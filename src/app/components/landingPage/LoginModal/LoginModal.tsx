import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../ui/Modal/Modal";
import TextField from "../../ui/TextField/TextField";
import RadixButton from "../../ui/RadixButton/RadixButton";
import { useLogin } from "<root>/app/api/hooks/auth/useLogin";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";

interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
}: LoginModalProps) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [, setUser] = useAtom(authAtom);

  const login = useLogin();

  const handleLogin = async () => {
    await login.mutateAsync(
      { email: userName, password: passWord },
      {
        onSuccess: (e) => {
          setUser(e);
          setIsLoginModalOpen(false);
        },
      }
    );
  };

  return (
    <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
      <div>
        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          value={passWord}
          onChange={(e) => setPassword(e.target.value)}
        />
        <RadixButton onClick={handleLogin}>Login</RadixButton>
      </div>
    </Modal>
  );
};

export default LoginModal;
