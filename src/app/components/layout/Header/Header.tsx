
import { useEffect, useState } from "react";
import { Switch } from "../../ui/Switch/Switch";
import "./header.scss";
import { useGetStore } from "<root>/app/api/hooks/store/useGetStore";
import { useParams, useRouter } from "next/navigation";
import { PersonIcon } from "@radix-ui/react-icons";
import PopoverDemo from "../../ui/Popover/Popover";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { HeaderSkeleton } from "./HeaderSkeleton";
import chroma from "chroma-js";


const themes = {
  dark: "dark-mode",
  light: "",
};

export const Header = () => {
  const { data: store, isSuccess } = useGetStore();
  const router = useRouter();
  const { appName } = useParams();


  const [isDarkMode, setIsDarkMode] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [user, setUser] = useAtom(authAtom);
  const isAdmin = !!user;
  const isTurnUserMode = !!user?.isTurnUserMode

  const handleClosePopover = () => setPopoverOpen(false);
  const handleOpenPopover = () => setPopoverOpen(true);

  const handleLogOut = () => {
    setUser(null);
    handleClosePopover();
  };

  const handleModeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    handleThemeChange(checked ? themes.light : themes.dark);
  };

  const handleIsShowUserMode = (checked: boolean) => {
    user && setUser({
      ...user,
      isTurnUserMode: checked
    })
  };

  const handleThemeChange = (theme: string) => {
    document.body.className = theme;
  };

  const handleNavigateToMainPage = () => {
    router.push(`/${appName}`);
  };


  // TODO CARD CODED
  const primary = "#002d8d"
  const background = isDarkMode ? "#ffffff" : "#2E2E2E"
  const secondary = "#9d9d9d"

  const root = document.querySelector("body");


  useEffect(() => {

    root?.style.setProperty("--primary-color", primary);
    root?.style.setProperty("--background-color", background);
    root?.style.setProperty("--secondary-color", secondary);

    // Generate Shades (Optional)
    root?.style.setProperty("--primary-color-light", chroma(primary).brighten(1).hex());
    root?.style.setProperty("--primary-color-dark", chroma(primary).darken(1).hex());
    root?.style.setProperty("--secondary-color-light", chroma(secondary).brighten(0.5).hex());
    root?.style.setProperty("--secondary-color-dark", chroma(secondary).darken(0.5).hex());


  }, [isDarkMode])


  if (!isSuccess) return <HeaderSkeleton />;

  return (
    <nav id="Header">
      <div className="title" onClick={handleNavigateToMainPage}>
        <img
          src={store.image ?? ""}
          alt="Logo"
          className="logo"
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
        <Switch checked={isTurnUserMode} onCheckedChange={handleIsShowUserMode} onText="User mode on" offText="User mode off" />

        <Switch checked={isDarkMode} onCheckedChange={handleModeChange} onText="Light mode" offText="Dark mode" />
      </div>
    </nav>
  );
};
