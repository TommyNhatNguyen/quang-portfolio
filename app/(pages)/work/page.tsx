"use client";

import "@/app/styles/work-component.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(TextPlugin);

const TITLE_TEXT =
  "Translating complex protocols into functional interfaces. Focused on utility, structure, and user autonomy.";

let hasAnimated = false;

const WorkPage = () => {
  useGSAP(() => {
    gsap.set(".work-container", { visibility: "visible" });
    gsap.set(".work-list", { top: "100%" });

    const containerHeight = document
      .querySelector(".work-container")!
      .getBoundingClientRect().height;
    const listEl = document.querySelector(".work-list") as HTMLElement;
    const fifthItem = document.querySelectorAll(".work-list__item")[4];
    const fiveItemsHeight =
      fifthItem.getBoundingClientRect().bottom -
      listEl.getBoundingClientRect().top;
    const targetTop = containerHeight - 64 - fiveItemsHeight;

    gsap.to(".work-list", {
      top: targetTop,
      duration: 1.8,
      ease: "power3.out",
      onComplete: setupScroll,
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
            scrub: 1.5,
            markers: true,
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
          <h1 className="work-content__info-title">&nbsp;</h1>
          <div className="work-content__info-tags">
            <div className="offer">
              <span className="offer__text">OPEN TO:</span>
              <span className="offer__value">
                OFFERS<span className="offer__value-blinker">_</span>
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
                <h2 className="title">Title</h2>
                <div className="description">
                  <span className="description__text">Defi_Interface</span>
                  <span className="description__separator"> | </span>
                  <span className="description__text">2024</span>
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
