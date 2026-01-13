import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { LABEL_HEIGHT } from "../(pages)/home/page";
import "./styles/avatar-card.scss";
type Props = {};

const AvatarCard = (props: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tagElemnent = document.querySelector(".work-content__info-tags");
    const cardWidth = cardRef?.current?.offsetWidth || 0;
    if (cardRef.current) {
      cardRef.current.style.left =
        (tagElemnent?.getBoundingClientRect().left || 0) -
        cardWidth -
        20 +
        "px";
    }
    window.addEventListener("resize", () => {
      if (!cardRef.current) return;
      cardRef.current.style.left =
        (tagElemnent?.getBoundingClientRect().left || 0) -
        cardWidth -
        20 +
        "px";
    });
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
