import { useGetStore } from "<root>/app/api/hooks/store/useGetStore";
import {
  EnvelopeClosedIcon,
  InstagramLogoIcon,
  MobileIcon,
  SewingPinFilledIcon,
  StitchesLogoIcon,
} from "@radix-ui/react-icons";

import "./Footer.scss";

const Footer = () => {
  const { data: store } = useGetStore();

  return (
    <footer id="Footer" className="dark-mode">
      <div className="contant-info">
        <div className="left-side">
          {store?.address && (
            <div className="item">
              <SewingPinFilledIcon /> {store.address}
            </div>
          )}
          {store?.phone && (
            <div className="item">
              <MobileIcon /> {store.phone}
            </div>
          )}
          {store?.email && (
            <div className="item">
              <EnvelopeClosedIcon /> {store.email}
            </div>
          )}
        </div>
        <div className="right-side">
          {store?.instagram && (
            <InstagramLogoIcon
              height={32}
              width={32}
              className="cursor-pointer"
            />
          )}
          {store?.facebook && (
            <StitchesLogoIcon
              height={32}
              width={32}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>

      <div className="line"></div>
      <div className="general">
        <span>Home</span>
        <span>About Us</span>
        <span>Terms and Conditions</span>
        <span>Privacy policy</span>
      </div>
    </footer>
  );
};

export default Footer;
