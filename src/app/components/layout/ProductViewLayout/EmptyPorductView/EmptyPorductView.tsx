import {
  ExclamationTriangleIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import RadixButton from '../../../ui/RadixButton/RadixButton';
import Modal from '../../../ui/Modal/Modal';
import CreateProductForm from '../../../product/CreateProductForm/CreateProductForm';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from '<root>/app/atom/authAtom';

const EmptyProductView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useAtom(authAtom);
  const isAdmin = !!user?.isTurnUserMode;

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <ExclamationTriangleIcon className="text-primaryText" />
      <h2 className="text-xl font-semibold text-primaryText">
        {isAdmin ? 'No Products Found' : 'No Products Available'}
      </h2>
      {isAdmin ? (
        <RadixButton
          onClick={() => setIsModalOpen(true)}
          className="mt-4 flex items-center px-4 py-2"
        >
          <PlusCircledIcon />
          Create a Product
        </RadixButton>
      ) : (
        <p className="mt-4 text-primary">
          Please check back later for updates!
        </p>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <CreateProductForm />
      </Modal>
    </div>
  );
};

export default EmptyProductView;
