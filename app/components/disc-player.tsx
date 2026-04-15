"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./styles/disc-player.scss";

const DiscPlayerComponent = () => {
  const discRef = useRef<HTMLDivElement>(null);
  const needleRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const timeline = useRef<gsap.core.Timeline | null>(null);
  const spinTween = useRef<gsap.core.Tween | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isHidden = useRef(false);
  const touchStartX = useRef(0);

  // Mobile swipe to hide/show
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;
      if (deltaX > 50 && !isHidden.current) {
        gsap.to(el, { x: "110%", duration: 0.3, ease: "power2.out" });
        isHidden.current = true;
      } else if (deltaX < -50 && isHidden.current) {
        gsap.to(el, { x: 0, duration: 0.3, ease: "power2.out" });
        isHidden.current = false;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (!discRef.current || !needleRef.current) return;

    // 🎧 Create audio ONCE
    audioRef.current = new Audio("/audio/music.mp3");
    audioRef.current.loop = true;

    // 💿 Disc spin (paused)
    spinTween.current = gsap.to(discRef.current, {
      rotation: 360,
      duration: 1.8,
      ease: "linear",
      repeat: -1,
      paused: true,
      transformOrigin: "50% 50%",
    });

    // ⏱ Needle → then start disc + audio
    timeline.current = gsap.timeline({ paused: true });

    timeline.current.to(needleRef.current, {
      rotation: 28,
      duration: 0.6,
      ease: "power2.out",
      transformOrigin: "70% 25%",
    });

    timeline.current.add(() => {
      spinTween.current?.play();
      audioRef.current?.play();
    });
  }, []);

  const togglePlay = () => {
    if (!timeline.current || !spinTween.current || !audioRef.current) return;

    if (!isPlaying) {
      timeline.current.play();
    } else {
      spinTween.current.pause();
      audioRef.current.pause();
      timeline.current.reverse();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <div className="disc-container" ref={containerRef} onClick={togglePlay}>
      <div className="disc-wood">
        <Image
          src="images/disc-wood.svg"
          alt="disc wood"
          width={400}
          height={360}
        />
      </div>

      <div className="disc-needle" ref={needleRef}>
        <Image
          src="images/disc-needle.svg"
          alt="disc needle"
          width={220}
          height={290}
        />
      </div>

      <div className="disc-center">
        <div className="disc" ref={discRef}>
          <Image src="images/disc.svg" alt="disc" width={500} height={500} />
          <span className="disc__name">Side A ABOUT_ME 33 RPM</span>
        </div>
      </div>
    </div>
  );
};

export default DiscPlayerComponent;
