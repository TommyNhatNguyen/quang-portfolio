"use client";

import "@/app/styles/work-component.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(TextPlugin);

const TYPING_SEQUENCE: {
  text: string;
  pauseAfter: number;
  deleteCount: number | "all";
}[] = [
  { text: "Hello", pauseAfter: 1, deleteCount: "all" },
  {
    text: "I am Quang Laam.",
    pauseAfter: 0.5,
    deleteCount: "am Quang Laam.".length,
  },
  {
    text: "design functional systems.",
    pauseAfter: 0.5,
    deleteCount: " I design functional systems".length,
  },
  {
    text: "Translating complex protocols into functional interfaces.",
    pauseAfter: 0,
    deleteCount: 0,
  },
];

const CHAR_TYPE_SPEED = 0.04;
const CHAR_DELETE_SPEED = 0.015;

const WorkPage = () => {
  useGSAP(() => {
    gsap.set(".work-container", { opacity: 0, visibility: "visible" });
    gsap.set(".work-list", { top: "100%" });
    gsap.set(".work-content__info-title", { opacity: 0 });
    gsap.set(".avatar-card", { visibility: "visible", opacity: 0 });
    gsap.set(".work-content__info-tags", { opacity: 0 });

    // --- Measurements ---
    const containerHeight = document
      .querySelector(".work-container")!
      .getBoundingClientRect().height;
    const listEl = document.querySelector(".work-list") as HTMLElement;
    const fifthItem = document.querySelectorAll(".work-list__item")[4];
    const fiveItemsHeight =
      fifthItem.getBoundingClientRect().bottom -
      listEl.getBoundingClientRect().top;
    const targetTop = containerHeight - 64 - fiveItemsHeight;

    // --- Title typing builder ---
    function buildTitleTyping() {
      const titleEl = document.querySelector(
        ".work-content__info-title",
      ) as HTMLElement;
      const cursorEl = titleEl.querySelector(".cursor") as HTMLElement;
      const tl = gsap.timeline();
      let currentText = "";
      const textNode = document.createTextNode("");
      titleEl.insertBefore(textNode, cursorEl);

      function setText(val: string) {
        textNode.textContent = val;
      }

      for (const step of TYPING_SEQUENCE) {
        for (const char of step.text) {
          const nextText = currentText + char;
          tl.call(() => setText(nextText), undefined, `+=${CHAR_TYPE_SPEED}`);
          currentText = nextText;
        }
        if (step.deleteCount === 0) break;
        if (step.pauseAfter > 0) tl.to({}, { duration: step.pauseAfter });
        const deleteCount =
          step.deleteCount === "all" ? currentText.length : step.deleteCount;
        for (let i = 0; i < deleteCount; i++) {
          currentText = currentText.slice(0, -1);
          const snapshot = currentText;
          tl.call(() => setText(snapshot), undefined, `+=${CHAR_DELETE_SPEED}`);
        }
      }
      return tl;
    }

    // --- Offer typing builder ---
    function buildOfferTyping() {
      const tl = gsap.timeline();

      const offerTextEl = document.querySelector(".offer__text") as HTMLElement;
      let offerText = "";
      for (const char of "OPEN TO:") {
        const next = offerText + char;
        tl.call(
          () => {
            offerTextEl.textContent = next;
          },
          undefined,
          `+=${CHAR_TYPE_SPEED}`,
        );
        offerText = next;
      }

      tl.to({}, { duration: 0.3 });

      const offerValueEl = document.querySelector(
        ".offer__value",
      ) as HTMLElement;
      const offerBlinker = offerValueEl.querySelector(
        ".offer__value-blinker",
      ) as HTMLElement;
      const offerTextNode = document.createTextNode("");
      offerValueEl.insertBefore(offerTextNode, offerBlinker);

      let offersText = "";
      for (const char of "OFFERS") {
        const next = offersText + char;
        tl.call(
          () => {
            offerTextNode.textContent = next;
          },
          undefined,
          `+=${CHAR_TYPE_SPEED}`,
        );
        offersText = next;
      }
      return tl;
    }

    // --- Master timeline ---
    const master = gsap.timeline({ onComplete: setupScroll });

    // (1) Work-list: fade in + slide up + item text typing

    master
      .to(".work-container", {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        ".work-list",
        {
          top: targetTop,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
        },
        "<",
      )
      .to(
        ".work-list__item-info .title",
        { text: "Title", duration: 0.4, ease: "none" },
        0.6,
      )
      .to(
        ".work-list__item-info .description__text:first-child",
        { text: "Defi_Interface", duration: 0.6, ease: "none" },
        "<",
      )
      .to(
        ".work-list__item-info .description__separator",
        { text: " | ", duration: 0.1, ease: "none" },
        "<",
      )
      .to(
        ".work-list__item-info .description__text:last-child",
        { text: "2024", duration: 0.3, ease: "none" },
        "<",
      );

    // (2) Title: fade in + typing animation
    master
      .to(".work-content__info-title", {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .add(buildTitleTyping());

    // (3) Avatar card: fade in
    master.to(".avatar-card", {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    });

    // (4) Tags: fade in + offer typing + progress bar
    master
      .to(".work-content__info-tags", {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .add(buildOfferTyping())
      .from(".progress", {
        width: "0%",
        minWidth: "0",
        duration: 0.6,
        ease: "power2.out",
      })
      .from(".progress__bar", {
        width: "0%",
        duration: 0.8,
        ease: "power2.out",
      });

    function setupScroll() {
      const container = document.querySelector(
        ".work-container",
      ) as HTMLElement;
      const lastItem = document.querySelector(
        ".work-list__item:last-child",
      ) as HTMLElement;

      if (container && lastItem) {
        const lastItemRect = lastItem.getBoundingClientRect();
        const footerTop = document
          .querySelector(".folder-footer")!
          .getBoundingClientRect().top;
        const scrollDistance = lastItemRect.bottom - footerTop - 10;

        gsap.to(".work-list", {
          y: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: ".work-container",
            scroller: ".folder-content",
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: true,
            scrub: 0.5,
          },
        });
      }
    }
  });

  return (
    <div className="work-container">
      <div className="work-content">
        <Image
          className="work-content__bg-paper"
          src={"/images/bg-paper.jpg"}
          alt="work-1"
          quality={100}
          width={1200}
          height={1200}
        />
        <div className="work-content__info">
          <h1 className="work-content__info-title">
            <span className="cursor">_</span>
          </h1>
          <div className="work-content__info-tags">
            <div className="offer">
              <span className="offer__text"></span>
              <span className="offer__value">
                <span className="offer__value-blinker">_</span>
              </span>
            </div>
            <div className="progress">
              <div className="progress__bar"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="work-list">
        {Array.from({ length: 30 }).map((_, index) => {
          return (
            <Link
              key={index}
              href={`/work/${index + 1}`}
              className="work-list__item"
              style={{
                position: "relative",
                top: index != 0 ? `-${index * 30}px` : 0,
              }}
            >
              <Image
                src={`/images/frame-${(index % 5) + 1}.png`}
                alt="work-1"
                width={1500}
                height={130}
              />
              <div className="work-list__item-info">
                <h2 className="title"></h2>
                <div className="description">
                  <span className="description__text"></span>
                  <span className="description__separator"></span>
                  <span className="description__text"></span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WorkPage;
