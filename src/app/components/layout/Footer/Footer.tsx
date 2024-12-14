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
            <a href={store.instagram} target="__blank">

              <InstagramIcon />
            </a>
          )}
          {store?.facebook && (
            <a href={store.facebook} target="__blank">
              <FacebookIcon />
            </a>


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
