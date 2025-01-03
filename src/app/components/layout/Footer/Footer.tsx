import { useGetStore } from "<root>/app/api/hooks/store/useGetStore";
import {
  EnvelopeClosedIcon,
  MobileIcon,
  SewingPinFilledIcon,
} from "@radix-ui/react-icons";

import "./Footer.scss";
import FacebookIcon from "../../ui/SVGAssets/FacebookIcon";
import InstagramIcon from "../../ui/SVGAssets/InstagramIcon";

const Footer = () => {
  const { data: store } = useGetStore();

  const isAddressAdded = store?.address
  const isPhoneAdded = store?.phone
  const isEmailAdded = store?.email
  const isInstagramAdded = store?.instagram
  const isFacebookAdded = store?.facebook


  return (
    <footer id="Footer" className="dark-mode">
      <div className="contant-info">
        <div className="left-side">
          {isAddressAdded && (
            <div className="item">
              <SewingPinFilledIcon /> {store.address}
            </div>
          )}
          {isPhoneAdded && (
            <div className="item">
              <MobileIcon /> {store.phone}
            </div>
          )}
          {isEmailAdded && (
            <div className="item">
              <EnvelopeClosedIcon /> {store.email}
            </div>
          )}
        </div>
        <div className="right-side">
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

      <div className="line"></div>
      {/* //TODO HARD CODED */}
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
