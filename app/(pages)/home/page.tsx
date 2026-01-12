"use client";
import { useState } from "react";
import "./styles/work-page.scss";

const LABEL_MAX_WIDTH = 217;
const LABEL_HEIGHT = 64;
const folderData = [
  {
    label: "Blog",
    id: "blog",
    color: "#FFFFFF",
    textColor: "var(--greyscale-900)",
    content: <div>Hello</div>,
  },
  {
    label: "Lab",
    id: "lab",
    color: "#EBE7DC",
    textColor: "var(--greyscale-900)",
    content: <div>Hello</div>,
  },
  {
    label: "About",
    id: "about",
    color: "#657043",
    textColor: "var(--greyscale-0)",
    content: <div>Hello</div>,
  },
  {
    label: "Work",
    id: "work",
    color: "#BC403C",
    textColor: "var(--greyscale-0)",
    content: <div>Hello</div>,
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("work");
  const _onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="folder-container">
      {folderData.map((folder, index) => (
        <button
          key={folder.label}
          className="folder-button"
          style={{
            backgroundColor: folder.color,
            left:
              22 + LABEL_MAX_WIDTH * (folderData.length - index - 1)
                ? `${22 + LABEL_MAX_WIDTH * (folderData.length - index - 1)}px`
                : "22px",
            color: folder.textColor,
            height: `${LABEL_HEIGHT}px`,
          }}
          onClick={() => _onChangeTab(folder.id)}
        >
          {folder.label}
        </button>
      ))}
      {folderData.map((folder, index) => (
        <div
          key={folder.label}
          className="folder-content"
          style={{
            backgroundColor: folder.color,
            position: "absolute",
            top: `${LABEL_HEIGHT}px`,
            zIndex: activeTab == folder.id ? 4 : index,
          }}
        >
          {folder.content}
        </div>
      ))}
    </div>
  );
}
