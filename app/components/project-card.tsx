import { RiAttachment2 } from "@remixicon/react";
import Image from "next/image";
import { HTMLAttributes } from "react";
import "./styles/project-card.scss";

type Props = {} & HTMLAttributes<HTMLDivElement>;

function ProjectCard(props: Props) {
  const { className, ...rest } = props;
  return (
    <div className={`project-card ${className}`} {...rest}>
      {/* Background */}
      <div className="project-card__bg">
        <Image
          src="/images/bg-paper.jpg"
          alt="project-card-bg"
          width={200}
          height={180}
        />
      </div>
      {/* Image */}
      <div className="project-card__image">
        <Image
          src="/images/avatar.jpg"
          alt="project-card-image"
          width={200}
          height={180}
        />
      </div>
      {/* Content */}
      <div className="project-card__content">
        {/* Content */}
        <div className="content">
          <p className="content__title">PRO: 01</p>
          <div className="content__progress">
            <div className="content__progress__bar"></div>
          </div>
        </div>
        {/* Cipboard Icon */}
        <div className="icon">
          <RiAttachment2 size={12} />
        </div>
      </div>
      {/* Sticker */}
      <div className="avatar-card__sticker">
        <div className="blur"></div>
      </div>
    </div>
  );
}

export default ProjectCard;
