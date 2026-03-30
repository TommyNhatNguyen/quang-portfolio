import ButtonComponent from "@/app/components/button";
import DownLoad2Line from "@/app/components/icons/download-2-line";

const FolderFooter = () => {
  return (
    <div className="folder-footer">
      <p className="folder-footer__text">CONTENT BY © QUANG LAAM</p>
      <ButtonComponent className="folder-footer__button">
        <span className="folder-footer__button-text">DOWNLOAD CV</span>
        <DownLoad2Line className="folder-footer__button-icon btn-icon" />
      </ButtonComponent>
    </div>
  );
};

export default FolderFooter;
