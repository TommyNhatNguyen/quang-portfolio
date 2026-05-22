"use client";
import ButtonComponent from "@/app/components/button";
import DiscPlayerComponent from "@/app/components/disc-player";
import DownLoad2Line from "@/app/components/icons/download-2-line";
import { useAboutPage } from "@/app/lib/hooks/use-about-page";
import { useResume } from "@/app/lib/hooks/use-resume";
import "@/app/styles/about-component.scss";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

const AboutPage = () => {
  const { aboutPage } = useAboutPage();
  const { resume } = useResume();
  return (
    <div className="about-container">
      <div className="content-wrapper">
        <div className="content-wrapper__bg">
          <Image
            className="content-wrapper__bg-img"
            src={"/images/bg-paper.jpg"}
            alt="work-1"
            quality={100}
            width={1200}
            height={1200}
          />
        </div>
        <div className="content-overflow-wrapper">
          <div className="content">
            <div className="wrapper">
              <h2 className="content__title">
                {aboutPage?.introduction_text ?? "Untitled"}
              </h2>
              <ButtonComponent
                className="content__download-btn"
                onClick={() => {
                  window.open(resume?.link, "_blank");
                }}
              >
                <span className="content__download-btn-text">
                  {resume?.label}
                </span>
                <DownLoad2Line className="content__download-btn-icon btn-icon" />
              </ButtonComponent>
              {aboutPage?.sections?.map((section) => {
                return (
                  <div key={section.id} className="content__group">
                    <div className="content__group-titlewrapper">
                      <h3 className="title">{section.section_title}</h3>
                      <div className="line"></div>
                    </div>
                    <ul className="content__group-infogroup-list">
                      {section?.section_items?.map((item) => {
                        return (
                          <li key={item.id} className="infogroup">
                            <div className="infogroup__titlegroup">
                              <div className="infogroup__titlegroup-title">
                                {item.time}
                              </div>
                              <div className="infogroup__titlegroup-line"></div>
                            </div>
                            <ul className="infogroup__descgrouplist">
                              <BlocksRenderer
                                content={item.content}
                                blocks={{
                                  paragraph: ({ children }) => (
                                    <li className="infogroup__descgrouplist-item">
                                      <p className="desc">{children}</p>
                                    </li>
                                  ),
                                  list: ({ children }) => (
                                    <li className="infogroup__descgrouplist-item">
                                      <ul
                                        className="desc"
                                        style={{
                                          listStyleType: "disc",
                                          paddingLeft: "16px",
                                        }}
                                      >
                                        {children}
                                      </ul>
                                    </li>
                                  ),
                                }}
                              />
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="disc-player">
        <DiscPlayerComponent
          songName={aboutPage?.song_name ?? "Untitled"}
          songRpm={aboutPage?.song_rpm ?? "0"}
          songAudioFile={aboutPage?.song_audio_file ?? null}
        />
      </div>
    </div>
  );
};

export default AboutPage;
