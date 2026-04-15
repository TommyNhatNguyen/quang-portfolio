import { LABEL_HEIGHT } from "@/app/constants/folder";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";
import "./styles/avatar-card.scss";
type Props = {};

let savedLeft: string | null = null;

const AvatarCard = (props: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!cardRef.current) return;
      const container = document.querySelector(".folder-container");
      const containerRect = container?.getBoundingClientRect();

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        if (!containerRect) return;
        cardRef.current.style.left = "";
        cardRef.current.style.right = "26px";
        cardRef.current.style.top =
          (containerRect?.height ?? 0) * 0.3 - containerRect.top - 50 + "px";
        savedLeft = null;
        return;
      }

      // Desktop: restore saved position if available
      if (savedLeft !== null) {
        cardRef.current.style.left = savedLeft;
        return;
      }

      // Calculate initial position from tags element
      const cardWidth = cardRef.current.offsetWidth || 0;
      cardRef.current.style.left =
        (containerRect?.width ?? 0) * 0.796 - cardWidth + "px";
      cardRef.current.style.right = "";
      savedLeft = (containerRect?.width ?? 0) * 0.7 - cardWidth + "px";
    };

    updatePosition();
    const onResize = () => {
      savedLeft = null;
      updatePosition();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useGSAP(() => {
    gsap.set(".avatar-card", { visibility: "visible", opacity: 1 });
    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => {
      Draggable.create(".avatar-card", {
        type: "x,y",
        inertia: true,
        bounds: ".folder-content",
      });
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
