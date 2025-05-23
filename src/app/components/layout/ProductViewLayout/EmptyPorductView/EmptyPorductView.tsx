import { ExclamationTriangleIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import RadixButton from "../../../ui/RadixButton/RadixButton";
import Modal from "../../../ui/Modal/Modal";
import CreateProductForm from "../../../product/CreateProductForm/CreateProductForm";
import { useState } from "react";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";

import "./EmptyProductView.scss";

const EmptyProductView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user] = useAtom(authAtom);
    const isAdmin = !!user?.isTurnUserMode;

    return (
        <div className="empty-product-view-container">
            <ExclamationTriangleIcon className="exclamation-icon" />
            <h2 className="empty-product-view-heading">
                {isAdmin ? "No Products Found" : "No Products Available"}
            </h2>
            {isAdmin ? (
                <RadixButton
                    onClick={() => setIsModalOpen(true)}
                    className="empty-product-view-button"
                >
                    <PlusCircledIcon />
                    Create a Product
                </RadixButton>
            ) : (
                <p className="empty-product-view-message">
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
