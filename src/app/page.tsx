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
import { PlusIcon } from "@radix-ui/react-icons";
import { useCreateStore } from "./api/useCreateStore";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateStoreModal, setIsCreateStoreModal] = useState(false);
  const [passWord, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [storeName, setStoreName] = useState("");

  const [user, setUser] = useAtom(authAtom);

  const { data: allStores, isLoading } = useGetUserStores();
  const login = useLogin();
  const router = useRouter();
  const createStore = useCreateStore();
  const queryClient = useQueryClient();

  const handleCloseModal = () => setIsLoginModalOpen(false);
  const handleLoginClick = () => setIsLoginModalOpen(true);
  const handleCloseCreateStoreModal = () => setIsCreateStoreModal(false);
  const handleOpenCreateStoreModal = () => setIsCreateStoreModal(true);

  console.log("user", user);

  const handleCreateStore = () => {
    user &&
      createStore.mutateAsync(
        {
          name: storeName,
          userId: user.user.id,
        },
        {
          onSuccess: () => {
            handleCloseCreateStoreModal();
            queryClient.invalidateQueries({
              queryKey: ["store", user.user.id],
            });

            console.log("aq movida", "store", user.user.id);
          },
        }
      );
  };

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

      <div className="flex flex-col items-center space-y-4 mt-6 w-4/5 ">
        {allStores &&
          allStores.map((store) => {
            return (
              <div
                key={store.id}
                className="w-4/5  text-center cursor-pointer p-4 border border-gray-300 rounded-lg shadow-md hover:bg-indigo-100 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1"
                onClick={() => handleNavigateToStore(store.name)}
              >
                <p className="text-lg font-semibold text-gray-800">
                  {store.name}
                </p>
              </div>
            );
          })}

        <div
          className="w-4/5  text-center cursor-pointer p-4 border border-gray-300 rounded-lg shadow-md bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1 flex items-center justify-center space-x-2"
          onClick={handleOpenCreateStoreModal}
        >
          <p className="text-lg font-semibold">Create store</p>
          <PlusIcon className="w-5 h-5" />
        </div>
      </div>

      <Modal isOpen={isCreateStoreModal} onClose={handleCloseCreateStoreModal}>
        <>
          <div className="p-6 space-y-4 ">
            <p>Create Store</p>
            <TextField
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Username"
              value={storeName}
            />

            <Button onClick={handleCreateStore} loading={createStore.isPending}>
              Create
            </Button>
          </div>
        </>
      </Modal>

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
