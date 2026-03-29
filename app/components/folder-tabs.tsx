"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FOLDER_TABS, LABEL_HEIGHT, LABEL_MAX_WIDTH } from "@/app/constants/folder";

interface FolderTabsProps {
  onHoverChange?: (tabId: string | null) => void;
}

const FolderTabs = ({ onHoverChange }: FolderTabsProps) => {
  const pathname = usePathname();
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [activeHoverTab, setActiveHoverTab] = useState<string>("");

  const _onHover = (tabId: string) => {
    setIsMouseHover((prev) => !prev);
    setActiveHoverTab(tabId);
    onHoverChange?.(tabId);
  };

  const _onHoverEnd = (tabId: string) => {
    setIsMouseHover((prev) => !prev);
    setActiveHoverTab(tabId);
    onHoverChange?.(null);
  };

  return (
    <>
      {FOLDER_TABS.map((folder, index) => (
        <Link
          key={folder.label}
          href={folder.path}
          className="folder-button"
          style={{
            backgroundColor: folder.color,
            left: `${22 + LABEL_MAX_WIDTH * (FOLDER_TABS.length - index - 1)}px`,
            color: folder.textColor,
            height: `${LABEL_HEIGHT}px`,
            top:
              activeHoverTab === folder.id && isMouseHover
                ? `-${10}px`
                : `${0}px`,
            zIndex: activeHoverTab === folder.id && isMouseHover ? 7 : 0,
          }}
          onMouseEnter={() => _onHover(folder.id)}
          onMouseLeave={() => _onHoverEnd(folder.id)}
        >
          {folder.label}
        </Link>
      ))}
    </>
  );
};

export default FolderTabs;
