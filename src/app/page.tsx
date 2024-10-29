"use client";
import { useState } from "react";
import Modal from "./components/ui/Modal/Modal";
import RadixButton from "./components/ui/RadixButton/RadixButton";
import TextField from "./components/ui/TextField/TextField";
import { Button, Spinner } from "@radix-ui/themes";
import { useLogin } from "./api/useLogin";
import { useAtom } from "jotai";
import { authAtom } from "./atom/authAtom";
import { useGetUserStores } from "./api/useGetStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [passWord, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useAtom(authAtom);

  const { data: allStores, isLoading } = useGetUserStores();
  const login = useLogin();
  const router = useRouter();

  const handleCloseModal = () => setIsLoginModalOpen(false);
  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleNavigateToStore = (storeName: string) =>
    router.push(`/${storeName}`);

  const handleLogin = () => {
    login.mutateAsync(
      {
        email: userName,
        password: passWord,
      },
      {
        onSuccess: (e) => {
          setUser(e);
          setIsLoginModalOpen(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="mt-10">
        {!user && <RadixButton onClick={handleLoginClick}>LOGIN</RadixButton>}
      </div>

      {isLoading && <Spinner />}

      {allStores &&
        allStores.map((store) => {
          return (
            <div
              key={store.id}
              className="cursor-pointer"
              onClick={() => handleNavigateToStore(store.name)}
            >
              {store.name}
            </div>
          );
        })}

      {!allStores && (
        <div className="mt-10 h-96 w-full max-w-lg bg-slate-500 flex items-center justify-center rounded-md shadow-lg">
          <p className="text-center text-white text-xl font-semibold">
            QR menu for restaurants and hotels
          </p>
        </div>
      )}

      <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal}>
        <>
          <div className="p-6 space-y-4 ">
            <p>LOG IN TO YOUR ACCOUNT</p>
            <TextField
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <Button onClick={handleLogin} loading={login.isPending}>
              Login
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
}
