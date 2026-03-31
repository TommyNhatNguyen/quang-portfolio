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
    if (hasAnimated) {
      gsap.set(".work-content__info-title", { text: TITLE_TEXT });
      // gsap.set(".avatar-card", { opacity: 1 });
      return;
    }
    hasAnimated = true;

    const tl = gsap.timeline({});
    tl.from(".work-list__item", {
      y: "100vh",
      duration: 1.8,
      ease: "power3.out",
      stagger: 0.025,
    })
      .to(
        ".work-content__info-title",
        {
          text: TITLE_TEXT,
          duration: 1.8,
          ease: "none",
        },
        "<0.1",
      )
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
      })
      .from(
        ".offer",
        {
          opacity: 0,
        },
        "-=0.2",
      );
    // .to(
    //   ".avatar-card",
    //   {
    //     opacity: 1,
    //     duration: 0.5,
    //   },
    //   "<",
    // );
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
        {Array.from({ length: 5 }).map((_, index) => {
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
                src={`/images/frame-${index + 1}.png`}
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
