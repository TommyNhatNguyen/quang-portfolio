"use client";

import AvatarCard from "@/app/components/avatar-card";
import FolderFooter from "@/app/components/folder-footer";
import FolderTabs from "@/app/components/folder-tabs";
import { FOLDER_TABS, LABEL_HEIGHT } from "@/app/constants/folder";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import "@/app/styles/folder-layout.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable, InertiaPlugin, ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import SocialMenu from "@/app/components/social-menu";
import { usePathname } from "next/navigation";
import { Activity, useEffect, useLayoutEffect, useRef, useState } from "react";
import { preload, SWRConfig } from "swr";

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

    // Recalculate Lenis when content grows (e.g. SWR data loads into nested children)
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    const observeChildren = () => {
      Array.from(wrapper.children).forEach((child) =>
        resizeObserver.observe(child),
      );
    };
    observeChildren();

    // Also watch for direct child additions (e.g. ScrollTrigger pin spacer)
    const mutationObserver = new MutationObserver(() => {
      lenis.resize();
      observeChildren();
    });
    mutationObserver.observe(wrapper, { childList: true });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
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

  useEffect(() => {
    preload(SWR_KEYS.avatar, swrFetcher);
    preload(SWR_KEYS.workPage, swrFetcher);
    preload(SWR_KEYS.header, swrFetcher);
    preload(SWR_KEYS.aboutPage, swrFetcher);
    preload(SWR_KEYS.resume, swrFetcher);
    preload(SWR_KEYS.footer, swrFetcher);
    preload(SWR_KEYS.labArticles, swrFetcher);
    preload(SWR_KEYS.blogCategories, swrFetcher);
    preload(SWR_KEYS.blogIntelLevels, swrFetcher);
    preload(SWR_KEYS.blogReadTimes, swrFetcher);
  }, []);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60_000,
      }}
    >
      <div className="folder-container">
        <FolderTabs onHoverChange={setHoveredTab} />
        <SocialMenu />
        <div
          ref={scrollerRef}
          className="folder-content"
          style={{
            backgroundColor: activeColor,
            transform: `translateY(${hoveredTab === activeId ? -12 : 0}px)`,
            zIndex: 6,
            top: LABEL_HEIGHT + 10,
          }}
        >
          {children}
        </div>
        <FolderFooter />
        <Activity mode={showAvatarCard ? "visible" : "hidden"}>
          <AvatarCard />
        </Activity>
      </div>
    </SWRConfig>
  );
}
