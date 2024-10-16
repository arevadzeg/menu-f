"use client";

import { useState } from "react";
import DropdownMenuComponent from "../../ui/Dropdown/Dropdown";
import { Switch } from "../../ui/Switch/Switch";
import "./header.scss";
import useGetStore from "<root>/app/api/useGetStore";

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

  console.log("getStore", store);
  const [selectedLanguage, setSelectedLanguage] = useState<string | number>(
    "GEO"
  );
  const [darkMode, setDarkMode] = useState(false);

  const handleModeChange = (checked: boolean) => {
    setDarkMode(checked);
    handleThemeChange(checked ? themes.light : themes.dark);
  };

  const handleThemeChange = (theme: string) => {
    document.body.className = theme; // Simpler, ensures only one theme class is applied
  };

  if (!store) return null;

  return (
    <nav id="Header">
      <div className="title">
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
