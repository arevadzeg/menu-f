"use client"; // Add this line

import { useState } from "react";
import DropdownMenuComponent from "../../ui/Dropdown/Dropdown";
import TextField from "../../ui/TextField/TextField";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";

const FilterSort = () => {
  const [sortOption, setSortOption] = useState<string | null | number>("asc");

  const options = [
    { label: "A to Z", value: "asc", icon: () => <ArrowDownIcon /> },
    { label: "Z to A", value: "desc", icon: () => <ArrowUpIcon /> },
  ];

  return (
    <div className="justify-end flex gap-2 px-8 ">
      <TextField isCollapsable />
      <DropdownMenuComponent
        options={options}
        selectedValue={sortOption}
        setSelectedValue={setSortOption}
        Trigger={() => (
          <CaretSortIcon className="rounded-md  bg-white w-8 h-8" />
        )}
      />
    </div>
  );
};

export default FilterSort;
