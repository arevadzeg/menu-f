import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../ui/Modal/Modal";
import TextField from "../../ui/TextField/TextField";
import RadixButton from "../../ui/RadixButton/RadixButton";
import { useLogin } from "<root>/app/api/hooks/auth/useLogin";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import './loginModal.scss'

interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

const LoginModal = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
}: LoginModalProps) => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [, setUser] = useAtom(authAtom);

  const toggaleLoginMode = () => setIsLoginMode((prev) => !prev)

  const login = useLogin();

  const handleLogin = async () => {
    await login.mutateAsync(
      { email: userName, password: passWord },
      {
        onSuccess: (e) => {
          setUser({
            ...e,
            isTurnUserMode: true
          });
          setIsLoginModalOpen(false);
        },
      }
    );
  };

  return (
    <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} contentClassName='login-modal'>
      <div className="login-modal-container">
        <h2 className="login-modal-title">Welcome Back!</h2>
        <p className="login-modal-subtitle">{isLoginMode ? "Please log in to continue" : "Please register to continue"}</p>
        <TextField
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Email"
          className="login-modal-input"
        />
        <TextField
          value={passWord}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="login-modal-input"
        />
        <RadixButton onClick={handleLogin} className="login-modal-button">
          {isLoginMode ? "Login" : "Register"}
        </RadixButton>
        <div className="login-modal-footer">
          <button className="login-modal-link">Forgot Password?</button>

          <hr />
          <span>

            <span>{isLoginMode ? 'Not member yet? ' : "Already have an account "}</span>
            <button className="login-modal-link" onClick={toggaleLoginMode}>{isLoginMode ? "Create an Account" : "Login"}</button>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
