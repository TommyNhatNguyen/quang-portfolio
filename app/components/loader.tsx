"use client";

import { FOLDER_TABS } from "@/app/constants/folder";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import "./styles/loader.scss";

let hasLoaded = false;

// Render order: Blog(back) → Lab → About → Work(front)
const FLAPS = [...FOLDER_TABS].reverse();

const MOBILE_BP = 768;

const Loader = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const flapsRef = useRef<HTMLDivElement[]>([]);
  const [visible, setVisible] = useState(!hasLoaded);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useGSAP(() => {
    if (hasLoaded || !overlayRef.current || !percentRef.current) return;

    gsap.set(sceneRef.current, { visibility: "visible" });

    const flaps = flapsRef.current;
    const count = flaps.length;

    const tl = gsap.timeline({
      onComplete: () => {
        hasLoaded = true;
        setVisible(false);
      },
    });

    // Phase 1: count percentage
    tl.to(percentRef.current, {
      innerText: 100,
      duration: 2,
      ease: "power2.inOut",
      snap: { innerText: 1 },
      onUpdate() {
        if (percentRef.current) {
          percentRef.current.textContent =
            Math.round(Number(percentRef.current.innerText)) + "%";
        }
      },
    });

    // Phase 2: unfold front-to-back (Work first → About → Lab → Blog last)
    // Each flap that unfolds gets sent to the back so the next one is on top
    for (let i = count - 1; i >= 0; i--) {
      const flap = flaps[i];
      const delay = (count - 1 - i) * 0.3;

      tl.to(
        flap,
        {
          rotateX: -85,
          duration: 1,
          ease: "power3.in",
          onStart: () => {
            gsap.set(flap, { zIndex: i });
          },
        },
        `unfold+=${delay}`,
      );
    }

    // Phase 3: fade out
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  if (!visible) return null;

  return (
    <div className="loader" ref={overlayRef}>
      <div className="loader__scene" ref={sceneRef}>
        {FLAPS.map((folder, i) => {
          const isFront = i === FLAPS.length - 1;
          const origIdx = FLAPS.length - 1 - i;
          return (
            <div
              key={folder.id}
              className="loader__flap"
              ref={(el) => {
                if (el) flapsRef.current[i] = el;
              }}
              style={{ backgroundColor: folder.color, zIndex: i + 1 }}
            >
              <div
                className="loader__flap-tab"
                style={{
                  backgroundColor: folder.color,
                  color: folder.textColor,
                  left: isMobile
                    ? `calc(${origIdx} * (80vw / 4))`
                    : 62 + origIdx * 217,
                }}
              />
              {isFront && (
                <span className="loader__percent" ref={percentRef}>
                  0%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Loader;
