"use client";

import { FOLDER_TABS, LABEL_HEIGHT } from "@/app/constants/folder";
import Link from "next/link";
import { useState } from "react";

interface FolderTabsProps {
  onHoverChange?: (tabId: string | null) => void;
}

const FolderTabs = ({ onHoverChange }: FolderTabsProps) => {
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
    <div className="folder-tabs">
      {FOLDER_TABS.map((folder, index) => (
        <div key={folder.label} className="folder-tab">
          <Link
            href={folder.path}
            className="folder-button"
            style={{
              backgroundColor: folder.color,
              color: folder.textColor,
              height: `${LABEL_HEIGHT}px`,
              transform:
                activeHoverTab === folder.id && isMouseHover
                  ? "translateY(-10px)"
                  : "translateY(0px)",
              zIndex: index,
            }}
            onMouseEnter={() => _onHover(folder.id)}
            onMouseLeave={() => _onHoverEnd(folder.id)}
          >
            {folder.label}
          </Link>
          <div
            className="folder-body"
            style={{
              backgroundColor: folder.color,
              transform:
                activeHoverTab === folder.id && isMouseHover
                  ? "translateY(-12px)"
                  : "translateY(0px)",
              zIndex: index,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default FolderTabs;
