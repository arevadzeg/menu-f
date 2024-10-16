"use client"; // Add this line
import { useParams, useRouter } from "next/navigation";
import "./MainCategories.scss";
import { useState } from "react";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";

const categories = [
  {
    id: "1e4d6e7b-3cb3-4c3f-ae1c-1eaf7d4f7c52", // Example UUID
    name: "Electronics",
    subCategories: [
      { id: "a07f75b4-1f9d-4e26-9538-bdc3c8c8e47e", name: "Mobile Phones" },
      { id: "b11c9e1f-1a4f-4c30-bf1a-8b7dfe3c1e43", name: "Laptops" },
      { id: "c26f9e6c-0ec1-4140-9156-e84eaf92e080", name: "Cameras" },
      { id: "d37e4b49-9e62-4799-b6bb-391ea16eb58f", name: "Headphones" },
    ],
  },
  {
    id: "2e4d6e7b-3cb3-4c3f-ae1c-1eaf7d4f7c53",
    name: "Fashion",
    subCategories: [
      { id: "e59f9e5d-b09b-41be-b8b8-2e4c8f92c05e", name: "Men's Clothing" },
      { id: "f76b1c4a-5e34-4f25-9267-31d81e6792e8", name: "Women's Clothing" },
      { id: "g93e1f2d-2db0-4c3b-8b2a-e953c7b5df09", name: "Footwear" },
      { id: "h43c4e7a-0b14-4e9d-9f03-10e0cd1c9d1b", name: "Accessories" },
    ],
  },
  {
    id: "3e4d6e7b-3cb3-4c3f-ae1c-1eaf7d4f7c54",
    name: "Home & Garden",
    subCategories: [
      { id: "i64f0d4f-2b94-467b-b049-834d546b2f08", name: "Furniture" },
      {
        id: "j81b0c84-b6a9-41f8-81ef-2f6b8e1f8b1e",
        name: "Kitchen Appliances",
      },
      { id: "k92b5e11-9f63-482c-bf72-9309ae4e85bc", name: "Gardening Tools" },
      { id: "l73d4f68-1055-4578-bc4a-e7b4bde37c64", name: "Decor" },
    ],
  },
  {
    id: "4e4d6e7b-3cb3-4c3f-ae1c-1eaf7d4f7c55",
    name: "Beauty & Health",
    subCategories: [
      { id: "m84f4c54-b1d1-4a6d-9f9c-3765fa3a4e90", name: "Skincare" },
      { id: "n75b0f35-d528-4f52-9f93-b0df7d909493", name: "Makeup" },
      { id: "o13c3f92-0018-48e1-bfb7-e988b85a98b1", name: "Vitamins" },
      { id: "p98d4f68-b35a-46b3-bc9e-e6a2c67c4b7d", name: "Personal Care" },
    ],
  },
  {
    id: "5e4d6e7b-3cb3-4c3f-ae1c-1eaf7d4f7c56",
    name: "Sports & Outdoors",
    subCategories: [
      { id: "q82d3b45-8c8f-4de3-b25f-ffcf546b48c6", name: "Fitness Equipment" },
      { id: "r34e0c9b-1ab2-47f2-a3ef-dde1f4bcaf68", name: "Outdoor Gear" },
      { id: "s24d7e65-8e6d-4977-b4bb-24be68f6cfa7", name: "Apparel" },
      { id: "t54f1b47-f4c0-45d7-8238-bfcd7b437f09", name: "Footwear" },
    ],
  },
  {
    id: "6e4d6e7b-3cb3-4c3f-ae1c-1eaf7d4f7c57",
    name: "Toys & Hobbies",
    subCategories: [
      { id: "u78d5f1f-8370-4b8f-ae05-4de5e59b78a2", name: "Educational Toys" },
      { id: "v56b1f99-6c9c-4710-9e8e-ffec9e54ab87", name: "Action Figures" },
      { id: "w34e5c6f-198e-43a4-bb09-22d89c60c68f", name: "Board Games" },
      { id: "x89c5e1c-37e3-4578-a9d4-66d37bff5d0c", name: "Drones" },
    ],
  },
  {
    id: "7e4d6e7b-3cb3-4c3f-ae1c-1eaf7d4f7c58",
    name: "Automotive",
    subCategories: [
      { id: "y74e1f4c-3e4c-4c2d-a0f4-499c3ae8f675", name: "Car Accessories" },
      { id: "z91e3b2e-9c9d-4e9d-9e10-ffdf7e57f125", name: "Tools & Equipment" },
      { id: "a1f3e0a0-6f69-482f-a7de-2e3d7b5bdb90", name: "Motorcycle Gear" },
    ],
  },
  {
    id: "8e4d6e7b-3cb3-4c3f-ae1c-1eaf7d4f7c59",
    name: "Books",
    subCategories: [
      { id: "b2c0d891-5e57-49f8-88c9-4c34e67810bc", name: "Fiction" },
      { id: "c3b2a0e2-5b09-4f5e-b9af-f6cd2580f914", name: "Non-Fiction" },
      { id: "d5a3c1e4-80ed-489c-8d47-f2a4213c16f3", name: "Children's Books" },
      { id: "e9a5e327-5c7f-4d51-9dcf-57794d172d43", name: "Textbooks" },
    ],
  },
];

const MainCategories = () => {
  const router = useRouter();
  const { appName, categoryId } = useParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    !!categoryId ? String(categoryId) : null
  ); // State to track selected category

  const handleNavigateToCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId); // Set selected category ID
    router.push(`/${appName}/${categoryId}`);
  };

  const isAdmin = true;

  return (
    <div id="MainCategories">
      <div className="categories-wrapper mt-8">
        {categories.map((category) => {
          const isSelected = category.id === selectedCategoryId; // Check if category is selected
          return (
            <div
              key={category.id} // Add key prop
              className={`category ${isSelected ? "selected" : ""}`} // Conditional class name
              onClick={() => handleNavigateToCategory(category.id)}
            >
              {category.name}

              {isAdmin && (
                <DotsVerticalIcon className="cursor-pointer delete" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCategories;
