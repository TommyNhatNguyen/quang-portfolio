import ButtonComponent from "@/app/components/button";
import DownLoad2Line from "@/app/components/icons/download-2-line";
import { useEffect, useState } from "react";
import { Resume } from "../interfaces/resume-interface";
import { footerService } from "../services/footer-service";
import { resumeService } from "../services/resume-service";

const fetchResume = async () => {
  const response = await resumeService.getResume();
  return response.data;
};

const fetchFooter = async () => {
  const response = await footerService.getFooter();
  return response.data;
};

const FolderFooter = () => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [footer, setFooter] = useState<{ content_by: string } | null>(null);
  useEffect(() => {
    (async () => {
      const response = await fetchResume();
      setResume(response);
      const footerResponse = await fetchFooter();
      setFooter(footerResponse);
    })();
  }, []);
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
