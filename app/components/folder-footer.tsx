import ButtonComponent from "@/app/components/button";
import DownLoad2Line from "@/app/components/icons/download-2-line";
import { useFooter } from "@/app/lib/hooks/use-footer";
import { useResume } from "@/app/lib/hooks/use-resume";

const FolderFooter = () => {
  const { resume } = useResume();
  const { footer } = useFooter();
  return (
    <div className="folder-footer">
      <p className="folder-footer__text">{footer?.content_by ?? "Untitled"}</p>
      <ButtonComponent
        className="folder-footer__button"
        onClick={() => {
          window.open(resume?.link, "_blank");
        }}
      >
        <span className="folder-footer__button-text">{resume?.label}</span>
        <DownLoad2Line className="folder-footer__button-icon btn-icon" />
      </ButtonComponent>
    </div>
  );
};

export default FolderFooter;
