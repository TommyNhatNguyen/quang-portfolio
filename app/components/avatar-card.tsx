import { LABEL_HEIGHT } from "@/app/constants/folder";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./styles/avatar-card.scss";
type Props = {};

let savedLeft: string | null = null;
let savedTop: string | null = null;

const AvatarCard = (props: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!cardRef.current) return;

      // Restore saved position if available
      if (savedLeft !== null) {
        cardRef.current.style.left = savedLeft;
        return;
      }

      // Calculate initial position from tags element
      const tagElement = document.querySelector(".work-content__info-tags");
      if (!tagElement) return;
      const cardWidth = cardRef.current.offsetWidth || 0;
      const left =
        tagElement.getBoundingClientRect().left - cardWidth - 300 + "px";
      cardRef.current.style.left = left;
      savedLeft = left;
      savedTop = cardRef.current.style.top;
    };

    updatePosition();
    window.addEventListener("resize", () => {
      savedLeft = null;
      updatePosition();
    });
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  useGSAP(() => {
    gsap.set(".avatar-card", { visibility: "visible", opacity: 1 });
    Draggable.create(".avatar-card", {
      type: "x,y",
      inertia: true,
      bounds: ".folder-content",
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
