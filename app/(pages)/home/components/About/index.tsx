import ButtonComponent from "@/app/components/button";
import DownLoad2Line from "@/app/components/icons/download-2-line";
import Image from "next/image";
import "../../styles/about-component.scss";

const AboutComponent = () => {
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
                As a responsible Product Designer, I focus on user-centric
                experiences, balancing compelling design with business outcomes.
                I’m eager to join a collaborative team fostering growth and
                impactful results.
              </h2>
              <ButtonComponent className="content__download-btn">
                <span className="content__download-btn-text">DOWNLOAD CV</span>
                <DownLoad2Line className="content__download-btn-icon btn-icon" />
              </ButtonComponent>
              <div className="content__group">
                <div className="content__group-titlewrapper">
                  <h3 className="title">Work experience</h3>
                  <div className="line"></div>
                </div>
                <ul className="content__group-infogroup-list">
                  <li className="infogroup">
                    <div className="infogroup__titlegroup">
                      <div className="infogroup__titlegroup-title">
                        07/2025 - Present
                      </div>
                      <div className="infogroup__titlegroup-line"></div>
                    </div>
                    <ul className="infogroup__descgrouplist">
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">Finviet</div>
                        <div className="line">|</div>
                        <div className="desc">Product Designer</div>
                      </li>
                    </ul>
                  </li>
                  <li className="infogroup">
                    <div className="infogroup__titlegroup">
                      <div className="infogroup__titlegroup-title">
                        06/2024 - 06/2025
                      </div>
                      <div className="infogroup__titlegroup-line"></div>
                    </div>
                    <ul className="infogroup__descgrouplist">
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">Pi Group</div>
                        <div className="line">|</div>
                        <div className="desc">Senior UX/UI Designer</div>
                      </li>
                    </ul>
                  </li>
                  <li className="infogroup">
                    <div className="infogroup__titlegroup">
                      <div className="infogroup__titlegroup-title">
                        06/2022 – 06/2024
                      </div>
                      <div className="infogroup__titlegroup-line"></div>
                    </div>
                    <ul className="infogroup__descgrouplist">
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">MWG</div>
                        <div className="line">|</div>
                        <div className="desc">Senior UX/UI Designer</div>
                      </li>
                    </ul>
                  </li>
                  <li className="infogroup">
                    <div className="infogroup__titlegroup">
                      <div className="infogroup__titlegroup-title">
                        2021 – 03/2022
                      </div>
                      <div className="infogroup__titlegroup-line"></div>
                    </div>
                    <ul className="infogroup__descgrouplist">
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">Unicloud</div>
                        <div className="line">|</div>
                        <div className="desc">
                          Senior Graphic & UX/UI designer 
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="infogroup">
                    <div className="infogroup__titlegroup">
                      <div className="infogroup__titlegroup-title">
                        2014 - 2021
                      </div>
                      <div className="infogroup__titlegroup-line"></div>
                    </div>
                    <ul className="infogroup__descgrouplist">
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">Graphic Designer</div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="content__group">
                <div className="content__group-titlewrapper">
                  <h3 className="title">Qualification</h3>
                  <div className="line"></div>
                </div>
                <ul className="content__group-infogroup-list">
                  <li className="infogroup">
                    <div className="infogroup__titlegroup">
                      <div className="infogroup__titlegroup-title">2025</div>
                      <div className="infogroup__titlegroup-line"></div>
                    </div>
                    <ul className="infogroup__descgrouplist --dot">
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">Growth/Product Design</div>
                        <div className="line">|</div>
                        <div className="desc">Growth Design Program</div>
                      </li>
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">Credential ID PDF2502 - 01</div>
                      </li>
                    </ul>
                  </li>
                  <li className="infogroup">
                    <div className="infogroup__titlegroup">
                      <div className="infogroup__titlegroup-title">2020</div>
                      <div className="infogroup__titlegroup-line"></div>
                    </div>
                    <ul className="infogroup__descgrouplist">
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">Telos Academy</div>
                        <div className="line">|</div>
                        <div className="desc">
                          Figma Basic - Advanced course
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="infogroup">
                    <div className="infogroup__titlegroup">
                      <div className="infogroup__titlegroup-title">
                        2009 - 2013
                      </div>
                      <div className="infogroup__titlegroup-line"></div>
                    </div>
                    <ul className="infogroup__descgrouplist">
                      <li className="infogroup__descgrouplist-item">
                        <div className="desc">Van Lang University</div>
                        <div className="line">|</div>
                        <div className="desc">Public Relations</div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
