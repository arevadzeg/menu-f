"use client";
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
    <nav id="Header">
      <div className="title">CHRONOSWISS</div>

      {/* <div className="menu-container">
        <DropdownMenuComponent
          options={options}
          selectedValue={selectedLanguage}
          setSelectedValue={setSelectedLanguage}
          Trigger={() => <div>{selectedLanguage}</div>}
        />
        <div className="dark-mode">
          <label className="label" htmlFor="airplane-mode">
            Dark Mode
          </label>
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        </div>
      </div> */}
    </nav>
  );
};
