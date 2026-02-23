"use client";
import AvatarCard from "@/app/components/avatar-card";
import ButtonComponent from "@/app/components/button";
import DownLoad2Line from "@/app/components/icons/download-2-line";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
import { useState } from "react";
import BlogComponent from "./components/blog";
import LabComponent from "./components/lab";
import WorkComponent from "./components/Work";
import "./styles/home-page.scss";
import AboutComponent from "./components/About";

export const LABEL_HEIGHT = 64;
export const LABEL_MAX_WIDTH = 217;
const folderData = [
  {
    label: "Blog",
    id: "blog",
    color: "#FFFFFF",
    textColor: "var(--greyscale-900)",
    content: <div>Hello</div>,
    component: <BlogComponent />,
  },
  {
    label: "Lab",
    id: "lab",
    color: "#EBE7DC",
    textColor: "var(--greyscale-900)",
    content: <LabComponent />,
  },
  {
    label: "About",
    id: "about",
    color: "#657043",
    textColor: "var(--greyscale-0)",
    content: <AboutComponent />,
  },
  {
    label: "Work",
    id: "work",
    color: "#BC403C",
    textColor: "var(--greyscale-0)",
    content: <WorkComponent />,
  },
];

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Draggable);
gsap.registerPlugin(InertiaPlugin);

export default function HomePage() {

  const [activeTabIndex, setActiveTabIndex] = useState(3);
  const [activeTab, setActiveTab] = useState("work");
  const [isMouseHover, setIsMouseHover] = useState(false);
  const [activeHoverTab, setActiveHoverTab] = useState<string>("");
  const _onChangeTab = (tab: string) => {
    setActiveTab(tab);
  };
  const _onHover = (tab: string, index: number) => {
    setIsMouseHover((prev) => !prev);
    setActiveHoverTab(tab);
    setActiveTabIndex(index);
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
            top:
              activeHoverTab == folder.id && isMouseHover
                ? `-${10}px`
                : `${0}px`,
            zIndex: activeHoverTab == folder.id && isMouseHover ? 7 : 0,
          }}
          onClick={() => _onChangeTab(folder.id)}
          onMouseEnter={() => _onHover(folder.id, index)}
          onMouseLeave={() => _onHover(folder.id, index)}
        >
          {folder.label}
        </button>
      ))}
      {folderData.map((folder, index) => {
        return (
          <div
            key={folder.label}
            className="folder-content"
            style={{
              backgroundColor: folder.color,
              position: "absolute",
              top:
                activeHoverTab == folder.id && isMouseHover
                  ? `${LABEL_HEIGHT - 15}px`
                  : `${LABEL_HEIGHT}px`,
              zIndex:
                activeTab == folder.id
                  ? 6
                  : activeTabIndex + 1 == index
                  ? 3
                  : 0,
              boxShadow: isMouseHover
                ? "-4px 0px 4px 0px var(--color-drop-shadow)"
                : "none",
            }}
          >
            {folder.content}
          </div>
        );
      })}
      <div
        className="folder-footer"
        style={{
          bottom: `-${LABEL_HEIGHT}px`,
        }}
      >
        <p className="folder-footer__text">CONTENT BY © QUANG LAAM</p>
        <ButtonComponent className="folder-footer__button">
          <span className="folder-footer__button-text">DOWNLOAD CV</span>
          <DownLoad2Line className="folder-footer__button-icon btn-icon" />
        </ButtonComponent>
      </div>
      {/* Avatar card */}
      <AvatarCard />
    </div>
  );
}
