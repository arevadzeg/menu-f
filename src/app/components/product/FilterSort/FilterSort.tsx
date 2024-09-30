"use client"; // Add this line

import { ChangeEvent, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // For managing routing and query params
import DropdownMenuComponent from "../../ui/Dropdown/Dropdown";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import TextField from "../../ui/TextField/TextField";
import { debounce } from "lodash"; // Import debounce from lodash

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

  // Debounced function to handle search change
  const debouncedSearchChange = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set("search", value);
      // Keep existing sort parameters
      router.push(pathname + "?" + params.toString());
    }, 500), // 500ms debounce
    [router, pathname]
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // Access the input value
    setSearchValue(value);
    console.log("value", value);
    debouncedSearchChange(value); // Call the debounced function
  };

  // Handle option change and update the URL query string
  const handleSortChange = (option: OptionInterface | null) => {
    console.log("option", option);
    if (option) {
      setSortOption(option.value);

      // Update the query parameters in the URL
      const params = new URLSearchParams(window.location.search);
      const [order, sort] = option.value.split("&");
      params.set("sort", sort);
      params.set("order", order);

      // Navigate to the updated URL with new query params
      router.push(pathname + "?" + params.toString());
    }
  };

  return (
    <div className="justify-end flex gap-2 px-8">
      <TextField value={searchValue} onChange={handleSearchChange} />
      <DropdownMenuComponent<OptionInterface>
        options={options}
        selectedValue={sortOption}
        onChange={handleSortChange} // Call handleSortChange when selecting an option
        Trigger={() => (
          <CaretSortIcon className="rounded-md bg-white w-8 h-8" />
        )}
      />
    </div>
  );
};

export default FilterSort;
