"use client"; // Add this line

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // For managing routing and query params
import DropdownMenuComponent from "../../ui/Dropdown/Dropdown";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";

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
    value: "asc&Price",
    icon: () => <ArrowUpIcon />,
  },
  {
    label: "Price Down",
    value: "desc&Price",
    icon: () => <ArrowDownIcon />,
  },
];

type OptionInterface = (typeof options)[number];

const FilterSort = () => {
  const [sortOption, setSortOption] = useState<string | null>(null);
  // const [order, setOrder] = useState<string>("name"); // Default sorting by name
  const router = useRouter();
  const pathname = usePathname();

  // Handle option change and update the URL query string
  const handleSortChange = (option: OptionInterface | null) => {
    console.log("option", option);
    if (option) {
      setSortOption(option.value);
      // setOrder(option.order);

      // Update the query parameters in the URL
      const params = new URLSearchParams(window.location.search);
      const [sort, order] = option.value.split("&");
      params.set("sort", sort);
      params.set("order", order);

      // Navigate to the updated URL with new query params
      // router.push(`${window.location.pathname}?${params.toString()}`);
      router.push(pathname + "?" + params.toString());
    }
  };

  return (
    <div className="justify-end flex gap-2 px-8 ">
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
