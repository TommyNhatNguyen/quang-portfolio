"use client";

import AvatarCard from "@/app/components/avatar-card";
import FolderFooter from "@/app/components/folder-footer";
import FolderTabs from "@/app/components/folder-tabs";
import { FOLDER_TABS, LABEL_HEIGHT } from "@/app/constants/folder";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "@/app/styles/folder-layout.scss";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeFolder = FOLDER_TABS.find((tab) =>
    pathname.startsWith(tab.path),
  );
  const activeColor = activeFolder?.color ?? FOLDER_TABS[1].color;
  const activeId = activeFolder?.id ?? FOLDER_TABS[1].id;

  const showAvatarCard = pathname.startsWith("/work") || pathname.startsWith("/about");

  return (
    <div className="folder-container">
      <FolderTabs onHoverChange={setHoveredTab} />
      <div
        className="folder-content"
        style={{
          backgroundColor: activeColor,
          position: "absolute",
          top:
            hoveredTab === activeId
              ? `${LABEL_HEIGHT - 15}px`
              : `${LABEL_HEIGHT}px`,
          zIndex: 6,
          boxShadow: hoveredTab
            ? "-4px 0px 4px 0px var(--color-drop-shadow)"
            : "none",
        }}
      >
        {children}
      </div>
      <FolderFooter />
      {showAvatarCard && <AvatarCard />}
    </div>
  );
}
