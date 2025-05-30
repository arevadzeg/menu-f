import { useEffect, useState } from "react";
import { Switch } from "../../ui/Switch/Switch";
import { useGetStore } from "<root>/app/api/hooks/store/useGetStore";
import { useParams, useRouter } from "next/navigation";
import { PersonIcon } from "@radix-ui/react-icons";
import PopoverDemo from "../../ui/Popover/Popover";
import { useAtom } from "jotai";
import { authAtom } from "<root>/app/atom/authAtom";
import { HeaderSkeleton } from "./HeaderSkeleton";
import chroma from "chroma-js";
import Link from 'next/link';

const themes = {
  dark: "dark-mode",
  light: "",
};

export const Header = () => {
  const { data: store, isSuccess } = useGetStore();
  const router = useRouter();
  const { appName } = useParams();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [user, setUser] = useAtom(authAtom);
  const isAdmin = !!user;
  const isTurnUserMode = !!user?.isTurnUserMode;

  const handleClosePopover = () => setPopoverOpen(false);
  const handleOpenPopover = () => setPopoverOpen(true);

  const handleLogOut = () => {
    setUser(null);
    handleClosePopover();
  };

  const handleModeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    handleThemeChange(checked ? themes.dark : themes.light);
  };

  const handleIsShowUserMode = (checked: boolean) => {
    user &&
      setUser({
        ...user,
        isTurnUserMode: checked,
      });
  };

  const handleThemeChange = (theme: string) => {
    document.body.className = theme;
  };

  const handleNavigateToMainPage = () => {
    router.push(`/${appName}`);
  };

  const primary = store?.theme;
  const root = document.querySelector("body");

  useEffect(() => {
    if (!primary) return;

    root?.style.setProperty("--primary-color", primary);
    root?.style.setProperty("--primary-color-light", chroma(primary).brighten(1).hex());
    root?.style.setProperty("--primary-color-dark", chroma(primary).darken(1).hex());
  }, [isDarkMode, store]);

  if (!isSuccess) return <HeaderSkeleton />;

  return (
    <nav
      id="Header"
      className="flex items-center justify-between p-4 px-8 mb-8"
    >
      <div
        className="flex gap-4 font-bold items-center cursor-pointer"
        onClick={handleNavigateToMainPage}
      >
        <img
          src={store.image ?? ""}
          alt="Logo"
          className="rounded-full max-h-10 max-w-10"
        />
        <span className="flex flex-col">
          <span className="text-secondary">Welcome to</span>
          <span className="text-primary">{store.name}</span>
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {isAdmin && (
          <PopoverDemo
            open={popoverOpen}
            onClose={handleClosePopover}
            content={
              <>
                <div onClick={handleLogOut} className="cursor-pointer mb-2">
                  Log out
                </div>
                <Link href={`/${store.name}/settings`}>
                  <div>Settings</div>
                </Link>
              </>
            }
          >
            <PersonIcon
              height={24}
              width={24}
              onClick={handleOpenPopover}
              className="cursor-pointer text-primaryText"
            />
          </PopoverDemo>
        )}

        <Switch
          checked={isTurnUserMode}
          onCheckedChange={handleIsShowUserMode}
          onText="User mode on"
          offText="User mode off"
        />

        <Switch
          checked={isDarkMode}
          onCheckedChange={handleModeChange}
          onText="Light mode"
          offText="Dark mode"
        />
      </div>
    </nav>
  );
};
