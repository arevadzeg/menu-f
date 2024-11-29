import { Spinner } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { Store } from "<root>/app/api/hooks/store/interfaceStore";

interface StoreListProps {
  isLoading: boolean;
  allStores: Store[];
  handleOpenCreateStoreModal: () => void;
  handleNavigateToStore: (name: string) => void;
}

export default function StoreList({
  isLoading,
  allStores,
  handleOpenCreateStoreModal,
  handleNavigateToStore,
}: StoreListProps) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
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

      {!allStores && (
        <div className="mt-10 h-96 w-full max-w-lg bg-slate-500 flex items-center justify-center rounded-md shadow-lg">
          <p className="text-center text-white text-xl font-semibold">
            QR menu for restaurants and hotels
          </p>
        </div>
      )}
    </div>
  );
}
