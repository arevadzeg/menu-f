'use client';

import { useEffect, useState } from 'react';
import { useGetStore } from '<root>/app/api/hooks/store/useGetStore';
import { useParams, useRouter } from 'next/navigation';
import { PersonIcon } from '@radix-ui/react-icons';
import { useAtom } from 'jotai';
import authAtom from '<root>/app/atom/authAtom';
import chroma from 'chroma-js';
import Link from 'next/link';
import Image from 'next/image';
import HeaderSkeleton from './HeaderSkeleton';
import PopoverDemo from '../../ui/Popover/Popover';
import Switch from '../../ui/Switch/Switch';

const themes = {
  dark: 'dark-mode',
  light: '',
};

function Header() {
  const { data: store, isSuccess } = useGetStore();
  const router = useRouter();
  const { appName } = useParams();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [root, setRoot] = useState<HTMLBodyElement | null>(null);
  const [user, setUser] = useAtom(authAtom);
  const isAdmin = !!user;
  const isTurnUserMode = !!user?.isTurnUserMode;

  const handleClosePopover = () => setPopoverOpen(false);
  const handleOpenPopover = () => setPopoverOpen(true);

  const handleLogOut = () => {
    setUser(null);
    handleClosePopover();
  };

  const handleThemeChange = (theme: string) => {
    document.body.className = theme;
  };

  useEffect(() => {
    setRoot(document.querySelector('body'));
  }, []);

  const handleModeChange = (checked: boolean) => {
    setIsDarkMode(checked);
    handleThemeChange(checked ? themes.dark : themes.light);
  };

  const handleIsShowUserMode = (checked: boolean) => {
    user
      && setUser({
        ...user,
        isTurnUserMode: checked,
      });
  };

  const handleNavigateToMainPage = () => {
    router.push(`/${appName}`);
  };

  const primary = store?.theme;

  useEffect(() => {
    if (!primary) return;

    root?.style.setProperty('--primary-color', primary);
    root?.style.setProperty(
      '--primary-color-light',
      chroma(primary).brighten(1).hex(),
    );
    root?.style.setProperty(
      '--primary-color-dark',
      chroma(primary).darken(1).hex(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkMode, store]);

  if (!isSuccess) return <HeaderSkeleton />;

  return (
    <nav
      id="Header"
      className="flex items-center justify-between p-4 px-8 mb-8"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleNavigateToMainPage}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleNavigateToMainPage();
          }
        }}
      >
        <Image
          src={store.image ?? ''}
          alt="Logo"
          width={40}
          height={40}
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
            content={(
              <>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleLogOut}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleLogOut();
                    }
                  }}
                >
                  Log out
                </div>
                <Link href={`/${store.name}/settings`}>
                  <div>Settings</div>
                </Link>
              </>
            )}
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
}

export default Header;
