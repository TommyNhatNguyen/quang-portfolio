"use client";

import AvatarCard from "@/app/components/avatar-card";
import FolderFooter from "@/app/components/folder-footer";
import FolderTabs from "@/app/components/folder-tabs";
import { FOLDER_TABS, LABEL_HEIGHT } from "@/app/constants/folder";
import "@/app/styles/folder-layout.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable, InertiaPlugin, ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { Activity, useEffect, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeFolder = FOLDER_TABS.find((tab) => pathname.startsWith(tab.path));
  const activeColor = activeFolder?.color ?? FOLDER_TABS[1].color;
  const activeId = activeFolder?.id ?? FOLDER_TABS[1].id;

  const showAvatarCard =
    pathname.startsWith("/work") || pathname.startsWith("/about");

  const scrollerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const tickerRef = useRef<((time: number) => void) | null>(null);

  // Kill Lenis and clean up all artifacts before paint on route change
  useLayoutEffect(() => {
    if (tickerRef.current) {
      gsap.ticker.remove(tickerRef.current);
      tickerRef.current = null;
    }
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
    const wrapper = scrollerRef.current;
    if (wrapper) {
      wrapper.classList.remove(
        "lenis",
        "lenis-smooth",
        "lenis-scrolling",
        "lenis-stopped",
      );
      wrapper.style.transform = "";
      wrapper.scrollTop = 0;
    }
  }, [pathname]);

  useEffect(() => {
    const wrapper = scrollerRef.current;
    if (!wrapper) return;

    wrapper.scrollTop = 0;

    const lenis = new Lenis({
      wrapper,
      content: wrapper,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    tickerRef.current = tickerCallback;
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Recalculate Lenis when direct children change (e.g. ScrollTrigger pin spacer added)
    const observer = new MutationObserver(() => {
      lenis.resize();
    });
    observer.observe(wrapper, { childList: true });

    return () => {
      observer.disconnect();
      if (tickerRef.current === tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerRef.current = null;
      }
      if (lenisRef.current === lenis) {
        lenisRef.current = null;
        lenis.destroy();
      }
    };
  }, [pathname]);

  return (
    <div className="folder-container">
      <FolderTabs onHoverChange={setHoveredTab} />
      <div
        ref={scrollerRef}
        className="folder-content"
        style={{
          backgroundColor: activeColor,
          position: "absolute",
          top:
            hoveredTab === activeId
              ? `${LABEL_HEIGHT - 15}px`
              : `${LABEL_HEIGHT}px`,
          zIndex: 6,
        }}
      >
        {children}
      </div>
      <FolderFooter />
      <Activity mode={showAvatarCard ? "visible" : "hidden"}>
        <AvatarCard />
      </Activity>
    </div>
  );
}
