'use client';

import { useGetStore } from '<root>/app/api/hooks/store/useGetStore';
import {
  EnvelopeClosedIcon,
  MobileIcon,
  SewingPinFilledIcon,
} from '@radix-ui/react-icons';

import FacebookIcon from '../../ui/SVGAssets/FacebookIcon';
import InstagramIcon from '../../ui/SVGAssets/InstagramIcon';

function Footer() {
  const { data: store } = useGetStore();

  const isAddressAdded = store?.address;
  const isPhoneAdded = store?.phone;
  const isEmailAdded = store?.email;
  const isInstagramAdded = store?.instagram;
  const isFacebookAdded = store?.facebook;

  return (
    <footer className="dark-mode p-12 mt-8 flex flex-col gap-4 bg-background text-primaryText">
      <div className="flex-wrap flex justify-between gap-4">
        <div className="flex gap-4">
          {isAddressAdded && (
            <div className="flex items-center gap-1 font-bold">
              <SewingPinFilledIcon />
              {' '}
              {store.address}
            </div>
          )}
          {isPhoneAdded && (
            <div className="flex items-center gap-1 font-bold">
              <MobileIcon />
              {' '}
              {store.phone}
            </div>
          )}
          {isEmailAdded && (
            <div className="flex items-center gap-1 font-bold">
              <EnvelopeClosedIcon />
              {' '}
              {store.email}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {isInstagramAdded && (
            <a href={store.instagram!} target="__blank">
              <InstagramIcon />
            </a>
          )}
          {isFacebookAdded && (
            <a href={store.facebook!} target="__blank">
              <FacebookIcon />
            </a>
          )}
        </div>
      </div>

      <div className="w-full h-[1px] bg-secondary" />

      <div className="flex gap-10">
        <span>Home</span>
        <span>About Us</span>
        <span>Terms and Conditions</span>
        <span>Privacy policy</span>
      </div>
    </footer>
  );
}

export default Footer;
