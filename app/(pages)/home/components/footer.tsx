import ButtonComponent from "@/app/components/button";
import DownLoad2Line from "@/app/components/icons/download-2-line";
import "../styles/footer-comp.scss";
export const LABEL_HEIGHT = 64;
export const LABEL_MAX_WIDTH = 217;
const Footer = () => {
  return (
    <div
      className="folder-footer"
      style={{
        bottom: `-${LABEL_HEIGHT}px`,
      }}
    >
      <p className="folder-footer__text">CONTENT BY © QUANG LAAM</p>
      <ButtonComponent className="folder-footer__button">
        <span className="folder-footer__button-text">DOWNLOAD CV</span>
        <DownLoad2Line className="folder-footer__button-icon btn-icon" />
      </ButtonComponent>
    </div>
  );
};

export default Footer;
