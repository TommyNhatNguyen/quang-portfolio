import { RiAttachment2 } from "@remixicon/react";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { WorkCard } from "../interfaces/work-page.interface";
import { getImage } from "../utils/getImage";
import "./styles/project-card.scss";

type Props = {
  workCard?: WorkCard;
} & HTMLAttributes<HTMLDivElement>;

function ProjectCard(props: Props) {
  const { className, ...rest } = props;
  return (
    <div className={`project-card ${className}`} {...rest}>
      {/* Background */}
      <div className="project-card__bg">
        <Image
          src={"/images/bg-paper.jpg"}
          alt="project-card-bg"
          width={200}
          height={180}
        />
      </div>
      {/* Image */}
      <div className="project-card__image">
        <Image
          src={getImage(props.workCard?.thumbnail?.url ?? "")}
          alt="project-card-image"
          width={200}
          height={180}
        />
      </div>
      {/* Content */}
      <div className="project-card__content">
        {/* Content */}
        <div className="content">
          <p className="content__title">
            {props.workCard?.title ?? "Untitled"}
          </p>
          <div className="content__progress">
            <div
              className="content__progress__bar"
              style={{ width: `${props.workCard?.progress ?? 70}%` }}
            ></div>
          </div>
        </div>
        {/* Cipboard Icon */}
        <div className="icon">
          <RiAttachment2 size={12} />
        </div>
      </div>
      {/* Sticker */}
      <div className="project-card__sticker">
        <div className="blur"></div>
      </div>
    </div>
  );
}

export default ProjectCard;
