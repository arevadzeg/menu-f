"use client";

import { useState } from "react";
import DropdownMenuComponent from "../../ui/Dropdown/Dropdown";
import { Switch } from "../../ui/Switch/Switch";
import "./header.scss";
import useGetStore from "<root>/app/api/useGetStore";
import { useParams, useRouter } from "next/navigation";
import { PersonIcon } from "@radix-ui/react-icons";
import PopoverDemo from "../../ui/Popover/Popover";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";

const themes = {
  dark: "dark-mode",
  light: "",
};

const languageOptions = [
  { label: "GEORGIAN", value: "GEO", icon: () => <div>GEO</div> },
  { label: "ENGLISH", value: "ENG", icon: () => <div>ENG</div> },
];

export const Header = () => {
  const { data: store } = useGetStore();
  const router = useRouter();
  const { appName } = useParams();
  const [selectedLanguage, setSelectedLanguage] = useState<string | number>(
    "GEO"
  );
  const [darkMode, setDarkMode] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [user, setUser] = useAtom(authAtom);
  const isAdmin = !!user;

  const handleClosePopover = () => setPopoverOpen(false);
  const handleOpenPopover = () => setPopoverOpen(true);

  const handleLogOut = () => {
    setUser(null);
    handleClosePopover();
  };

  const handleModeChange = (checked: boolean) => {
    setDarkMode(checked);
    handleThemeChange(checked ? themes.light : themes.dark);
  };

  const handleThemeChange = (theme: string) => {
    document.body.className = theme; // Simpler, ensures only one theme class is applied
  };

  const handleNavigateToMainPage = () => {
    router.push(`/${appName}`);
  };

  if (!store) return null;

  return (
    <nav id="Header">
      <div className="title" onClick={handleNavigateToMainPage}>
        <img
          src={store.image}
          alt="Logo"
          className="rounded-full max-h-10 max-w-10"
        />
        <span className="welcome">
          <span className="text">Welcome to</span>
          <span className="name">{store.name}</span>
        </span>
      </div>

      <div className="menu-container">
        {isAdmin && (
          <PopoverDemo
            open={popoverOpen}
            onClose={handleClosePopover}
            content={<div onClick={handleLogOut}>Log out</div>}
          >
            <PersonIcon height={24} width={24} onClick={handleOpenPopover} />
          </PopoverDemo>
        )}
        <DropdownMenuComponent
          options={languageOptions}
          selectedValue={selectedLanguage}
          setSelectedValue={setSelectedLanguage}
          Trigger={() => (
            <div className="selected-lang">{selectedLanguage}</div>
          )}
        />
        <Switch checked={darkMode} onCheckedChange={handleModeChange} />
      </div>
    </nav>
  );
};
