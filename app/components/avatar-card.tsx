import { LABEL_HEIGHT } from "@/app/constants/folder";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./styles/avatar-card.scss";
type Props = {};

const AvatarCard = (props: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      const tagElement = document.querySelector(".work-content__info-tags");
      if (!cardRef.current || !tagElement) return;
      const cardWidth = cardRef.current.offsetWidth || 0;
      cardRef.current.style.left =
        tagElement.getBoundingClientRect().left - cardWidth - 20 + "px";
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  useGSAP(() => {
    Draggable.create(".avatar-card", {
      type: "x,y",
      inertia: true,
      bounds: ".folder-container",
    });
  });

  return (
    <div
      ref={cardRef}
      className="avatar-card"
      style={{
        top: `${LABEL_HEIGHT + 14}px`,
      }}
    >
      {/* Image */}
      <div className="avatar-card__image">
        <Image
          alt="avatar image"
          src={"/images/avatar.jpg"}
          width={300}
          height={300}
        />
        {/* Content */}
        <div className="avatar-card__content">
          <p className="avatar-card__content-name">Quang Laam</p>
          <p className="avatar-card__content-title">PRODUCT DESIGNER</p>
          <div className="avatar-card__content-bg"></div>
        </div>
      </div>
      {/* Sticker */}
      <div className="avatar-card__sticker">
        <div className="blur"></div>
      </div>
    </div>
  );
};

export default AvatarCard;
