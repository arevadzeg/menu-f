"use client"; // Add this line

import { useState } from "react";
import DropdownMenuComponent from "../../ui/Dropdown/Dropdown";
import "./header.scss";
import { Switch } from "../../ui/Switch/Switch";

export const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    string | null | number
  >("GEO");
  const [darkMode, setDarkMode] = useState(false);

  const options = [
    { label: "GEORGIAN", value: "GEO", icon: () => <div>GEO</div> },
    { label: "ENGLISH", value: "ENG", icon: () => <div>ENG</div> },
  ];

  return (
    <nav
      className="flex items-center justify-between p-4  text-whiteA-12"
      id="Header"
    >
      <div className="flex items-center">
        <div className="text-lg font-bold text-cyan-300 mr-6">CHRONOSWISS</div>
        <div className="yle">LOGO</div>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenuComponent
          options={options}
          selectedValue={selectedLanguage}
          setSelectedValue={setSelectedLanguage}
          Trigger={() => <div>{selectedLanguage}</div>}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            className="Label p-4"
            htmlFor="airplane-mode"
            style={{ paddingRight: 15 }}
          >
            Dark Mode
          </label>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div>
    </nav>
  );
};
