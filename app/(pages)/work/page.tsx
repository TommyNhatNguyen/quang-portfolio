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
    gsap.set(".work-container", { visibility: "visible" });
    gsap.set(".work-list", { top: "100%" });

    // Typing animation
    const titleEl = document.querySelector(
      ".work-content__info-title",
    ) as HTMLElement;
    const cursorEl = titleEl.querySelector(".cursor") as HTMLElement;

    function buildTypingTimeline() {
      const tl = gsap.timeline();
      let currentText = "";
      // Insert a text node before the cursor
      const textNode = document.createTextNode("");
      titleEl.insertBefore(textNode, cursorEl);

      function setText(val: string) {
        textNode.textContent = val;
      }

      for (const step of TYPING_SEQUENCE) {
        // Type characters one by one
        for (const char of step.text) {
          const nextText = currentText + char;
          tl.call(() => setText(nextText), undefined, `+=${CHAR_TYPE_SPEED}`);
          currentText = nextText;
        }

        if (step.deleteCount === 0) break;

        // Pause after typing
        if (step.pauseAfter > 0) {
          tl.to({}, { duration: step.pauseAfter });
        }

        // Delete characters
        const deleteCount =
          step.deleteCount === "all" ? currentText.length : step.deleteCount;
        for (let i = 0; i < deleteCount; i++) {
          currentText = currentText.slice(0, -1);
          const snapshot = currentText;
          tl.call(() => setText(snapshot), undefined, `+=${CHAR_DELETE_SPEED}`);
        }
      }

      // Type "OPEN TO:" into offer text
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

      // Type "OFFERS" into offer value (before the blinker)
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

    buildTypingTimeline();

    const containerHeight = document
      .querySelector(".work-container")!
      .getBoundingClientRect().height;
    const listEl = document.querySelector(".work-list") as HTMLElement;
    const fifthItem = document.querySelectorAll(".work-list__item")[4];
    const fiveItemsHeight =
      fifthItem.getBoundingClientRect().bottom -
      listEl.getBoundingClientRect().top;
    const targetTop = containerHeight - 64 - fiveItemsHeight;

    const slideTl = gsap.timeline({ onComplete: setupScroll });

    slideTl
      .to(".work-list", {
        top: targetTop,
        duration: 1.8,
        ease: "power3.out",
      })
      .to(
        ".work-list__item-info .title",
        { text: "Title", duration: 0.4, ease: "none" },
        0.6,
      )
      .to(
        ".work-list__item-info .description__text:first-child",
        {
          text: "Defi_Interface",
          duration: 0.6,
          ease: "none",
        },
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
            scrub: true,
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
