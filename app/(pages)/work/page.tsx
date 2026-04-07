"use client";

import Frame from "@/app/components/icons/frame";
import ProjectCard from "@/app/components/project-card";
import "@/app/styles/work-component.scss";
import { useGSAP } from "@gsap/react";
import { RiArrowRightUpLine } from "@remixicon/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

gsap.registerPlugin(TextPlugin);
gsap.ticker.lagSmoothing(0);

let hasAnimated = false;

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

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // W3C relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

const WorkPage = () => {
  useGSAP(() => {
    // --- Shared measurements & helpers ---
    const containerHeight = document
      .querySelector(".work-container")!
      .getBoundingClientRect().height;
    const listEl = document.querySelector(".work-list") as HTMLElement;
    const fifthItem = document.querySelectorAll(".work-list__item")[4];
    const fiveItemsHeight =
      fifthItem.getBoundingClientRect().bottom -
      listEl.getBoundingClientRect().top;
    const targetTop = containerHeight - 64 - fiveItemsHeight;

    function restoreFinalState() {
      gsap.set(".work-container", { opacity: 1, visibility: "visible" });
      gsap.set(".work-list", { top: targetTop, opacity: 1 });
      gsap.set(".work-content__info-title", { opacity: 1 });
      gsap.set(".work-content__info-tags", { opacity: 1 });

      const titleEl = document.querySelector(
        ".work-content__info-title",
      ) as HTMLElement;
      const cursorEl = titleEl.querySelector(".cursor") as HTMLElement;
      const hasTextNode = Array.from(titleEl.childNodes).some(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
      );
      if (!hasTextNode) {
        titleEl.insertBefore(
          document.createTextNode(
            TYPING_SEQUENCE[TYPING_SEQUENCE.length - 1].text,
          ),
          cursorEl,
        );
      }

      document
        .querySelectorAll(".work-list__item-info .title")
        .forEach((el) => {
          el.textContent = "Title";
        });
      document
        .querySelectorAll(
          ".work-list__item-info .description__text:first-child",
        )
        .forEach((el) => {
          el.textContent = "Defi_Interface";
        });
      document
        .querySelectorAll(".work-list__item-info .description__separator")
        .forEach((el) => {
          el.textContent = " | ";
        });
      document
        .querySelectorAll(".work-list__item-info .description__text:last-child")
        .forEach((el) => {
          el.textContent = "2024";
        });

      const offerTextEl = document.querySelector(".offer__text") as HTMLElement;
      if (!offerTextEl.textContent) offerTextEl.textContent = "OPEN TO:";
      const offerValueEl = document.querySelector(
        ".offer__value",
      ) as HTMLElement;
      const offerBlinker = offerValueEl.querySelector(
        ".offer__value-blinker",
      ) as HTMLElement;
      if (offerValueEl.childNodes.length <= 1) {
        offerValueEl.insertBefore(
          document.createTextNode("OFFERS"),
          offerBlinker,
        );
      }
    }

    const mm = gsap.matchMedia();

    // --- Mobile: no animation, show final state ---
    mm.add("(max-width: 768px)", () => {
      const containerHeight = document
        .querySelector(".work-container")!
        .getBoundingClientRect().height;
      const listEl = document.querySelector(".work-list") as HTMLElement;
      const fifthItem = document.querySelectorAll(".work-list__item")[4];
      const fiveItemsHeight =
        fifthItem.getBoundingClientRect().bottom -
        listEl.getBoundingClientRect().top;
      const targetTop = containerHeight - 200 - fiveItemsHeight;

      restoreFinalState();
      // Hide cursor on mobile
      const cursor = document.querySelector(
        ".work-content__info-title .cursor",
      ) as HTMLElement;
      if (cursor) cursor.style.display = "none";

      gsap.set(".work-list", { top: targetTop });
      gsap.utils
        .toArray<HTMLElement>(".work-list__item")
        .forEach((item, index) => {
          gsap.set(item, {
            top: index != 0 ? `-${index * 10}px` : 0,
          });
        });
      // setupScroll();
      // setupHover(listEl);
    });

    // --- Desktop: full animation ---
    mm.add("(min-width: 769px)", () => {
      if (hasAnimated) {
        restoreFinalState();
        setupScroll();
        setupHover(listEl);
        return;
      }
      hasAnimated = true;

      gsap.set(".work-container", { opacity: 0, visibility: "visible" });
      gsap.set(".work-list", { top: "100%" });
      gsap.set(".work-content__info-title", { opacity: 0 });
      gsap.set(".work-content__info-tags", { opacity: 0 });

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
            tl.call(
              () => setText(snapshot),
              undefined,
              `+=${CHAR_DELETE_SPEED}`,
            );
          }
        }
        return tl;
      }

      // --- Offer typing builder ---
      function buildOfferTyping() {
        const tl = gsap.timeline();

        const offerTextEl = document.querySelector(
          ".offer__text",
        ) as HTMLElement;
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
      const master = gsap.timeline();

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
            onComplete: setupScroll,
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

      // (3) Tags: fade in + offer typing + progress bar
      master
        .to(".work-content__info-tags", {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .add(buildOfferTyping())
        .from(".work-content__info-tags .progress", {
          width: "0%",
          minWidth: "0",
          duration: 0.6,
          ease: "power2.out",
        })
        .from(".work-content__info-tags .progress__bar", {
          width: "0%",
          duration: 0.8,
          ease: "power2.out",
        });

      setupHover(listEl);
    }); // end desktop mm.add

    function setupHover(listEl: HTMLElement) {
      const items = gsap.utils.toArray<HTMLElement>(".work-list__item");
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      const listRect = listEl.getBoundingClientRect();

      // Position project cards centered on their peer item
      items.forEach((item, i) => {
        const card = cards[i];
        if (!card) return;
        const itemRect = item.getBoundingClientRect();
        const cardW = card.offsetWidth;
        const cardH = card.offsetHeight;
        const top =
          itemRect.top +
          (itemRect.height + 50) -
          listRect.top +
          (itemRect.height - cardH) / 2;
        const left =
          itemRect.left - listRect.left + (itemRect.width - cardW) / 2;
        gsap.set(card, { top, left });
      });

      // Hover: fade description out, icon in, card slides up
      items.forEach((item) => {
        const desc = item.querySelector(".description") as HTMLElement;
        const icon = item.querySelector(".icon") as HTMLElement;
        const itemRect = item.getBoundingClientRect();
        const card = item.nextElementSibling as HTMLElement;
        const cardRect = card.getBoundingClientRect();
        const cardH = cardRect.height;
        const cardTop =
          itemRect.top - 25 - listRect.top + (itemRect.height - cardH);
        const cardInitialTop =
          itemRect.top +
          itemRect.height * 1.25 -
          listRect.top +
          (itemRect.height - cardH) / 2;

        item.addEventListener("mouseenter", () => {
          gsap.to(card, {
            top: cardTop,
            rotateZ: 8,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(item, { y: -6, duration: 0.3, ease: "power2.out" });
          gsap.to(desc, { opacity: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { opacity: 1, duration: 0.3, ease: "power2.out" });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(card, {
            top: cardInitialTop,
            rotateZ: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(item, { y: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(desc, { opacity: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(icon, { opacity: 0, duration: 0.3, ease: "power2.out" });
        });
      });

      // Track hover during scroll
      const scroller = document.querySelector(".folder-content") as HTMLElement;
      let hoveredItem: HTMLElement | null = null;

      scroller.addEventListener("scroll", () => {
        const mouseX = (window as any).__mouseX ?? 0;
        const mouseY = (window as any).__mouseY ?? 0;
        const elUnderCursor = document.elementFromPoint(mouseX, mouseY);
        const itemUnderCursor = elUnderCursor?.closest(
          ".work-list__item",
        ) as HTMLElement | null;

        if (itemUnderCursor !== hoveredItem) {
          if (hoveredItem) {
            hoveredItem.dispatchEvent(new MouseEvent("mouseleave"));
          }
          hoveredItem = itemUnderCursor;
          if (hoveredItem) {
            hoveredItem.dispatchEvent(new MouseEvent("mouseenter"));
          }
        }
      });

      document.addEventListener("mousemove", (e) => {
        (window as any).__mouseX = e.clientX;
        (window as any).__mouseY = e.clientY;
      });
    }

    function setupScroll() {
      const allItems = document.querySelectorAll(".work-list__item");
      const firstItem = allItems[0] as HTMLElement;
      const lastItem = allItems[allItems.length - 1] as HTMLElement;
      const footerTop = document
        .querySelector(".folder-footer")!
        .getBoundingClientRect().top;

      if (firstItem && lastItem) {
        const totalHeight =
          lastItem.getBoundingClientRect().bottom -
          firstItem.getBoundingClientRect().top;
        const visibleHeight = footerTop - firstItem.getBoundingClientRect().top;
        const scrollDistance = totalHeight - visibleHeight;

        if (scrollDistance > 0) {
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
        {Array.from({ length: 5 }).map((_, index) => {
          const bgColor = `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")}`;
          const textColor = getContrastColor(bgColor);
          return (
            <Fragment key={index}>
              <Link
                href={`/work/${index + 1}`}
                className="work-list__item"
                style={{
                  position: "relative",
                  top: index != 0 ? `-${index * 30}px` : 0,
                }}
              >
                <div className="frame">
                  <Frame color={bgColor} id={`frame-${index}`} />
                </div>
                <div
                  className="work-list__item-info"
                  style={{ color: textColor }}
                >
                  <h2 className="title" style={{ color: textColor }}></h2>
                  <div className="description">
                    <span
                      className="description__text"
                      style={{ color: textColor }}
                    ></span>
                    <span
                      className="description__separator"
                      style={{ color: textColor }}
                    ></span>
                    <span
                      className="description__text"
                      style={{ color: textColor }}
                    ></span>
                  </div>
                  <div className="icon">
                    <RiArrowRightUpLine size={48} color={textColor} />
                  </div>
                </div>
              </Link>
              <ProjectCard
                style={{
                  position: "absolute",
                }}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default WorkPage;
