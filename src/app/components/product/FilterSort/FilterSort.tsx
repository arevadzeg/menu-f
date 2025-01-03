"use client";

import { ChangeEvent, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DropdownMenuComponent from "../../ui/Dropdown/Dropdown";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import TextField from "../../ui/TextField/TextField";
import { debounce } from "lodash";
import Modal from "../../ui/Modal/Modal";
import CreateProductForm from "../CreateProductForm/CreateProductForm";
import RadixButton from "../../ui/RadixButton/RadixButton";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";

const options = [
  {
    label: "A to Z",
    value: "asc&name",
    icon: () => <ArrowDownIcon />,
  },
  {
    label: "Z to A",
    value: "desc&name",
    icon: () => <ArrowUpIcon />,
  },
  {
    label: "Price Up",
    value: "asc&price",
    icon: () => <ArrowUpIcon />,
  },
  {
    label: "Price Down",
    value: "desc&price",
    icon: () => <ArrowDownIcon />,
  },
];

type OptionInterface = (typeof options)[number];

const FilterSort = () => {
  const [sortOption, setSortOption] = useState<string | null>(null);
  const searchparams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchparams.get("search") || ""
  );
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useAtom(authAtom);

  const isAdmin = !!user?.isTurnUserMode;

  // Debounced function to handle search change
  const debouncedSearchChange = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set("search", value);
      router.push(pathname + "?" + params.toString());
    }, 500), // 500ms debounce
    [router, pathname]
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearchChange(value);
  };

  const handleSortChange = (option: OptionInterface | null) => {
    if (option) {
      setSortOption(option.value);

      const params = new URLSearchParams(window.location.search);
      const [order, sort] = option.value.split("&");
      params.set("sort", sort);
      params.set("order", order);

      router.push(pathname + "?" + params.toString());
    }
  };

  return (
    <div className="justify-end flex gap-2 px-8">
      {isAdmin && (
        <RadixButton onClick={() => setIsModalOpen(true)}>
          Create product
        </RadixButton>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <CreateProductForm />
      </Modal>
      <TextField value={searchValue} onChange={handleSearchChange} />
      <DropdownMenuComponent<OptionInterface>
        options={options}
        selectedValue={sortOption}
        onChange={handleSortChange}
        Trigger={() => (
          <CaretSortIcon className="rounded-md bg-white w-8 h-8" />
        )}
      />
    </div>
  );
};

export default FilterSort;
