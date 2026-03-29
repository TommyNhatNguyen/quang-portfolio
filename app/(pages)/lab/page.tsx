import Image from "next/image";
import { Fragment } from "react/jsx-runtime";
import "@/app/styles/lab-component.scss";

const LabPage = () => {
  return (
    <div className="lab-container">
      <div className="lab-scroll">
        <div className="lab-content">
          {Array.from({ length: 2 }).map((_, index) => {
            return (
              <Fragment key={index}>
                <div className="lab-content__item">
                  <div className="lab-content__item-bg">
                    <Image
                      className="img"
                      src={"/images/bg-paper.jpg"}
                      alt="work-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-project">
                    <Image
                      className="img"
                      src={"/images/lab-1.png"}
                      alt="lab-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-dots --right">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <div className="lab-content__item-content --left">
                    <p>Agence Vincent Dubuc</p>
                    <p>Branding / Web</p>
                  </div>
                </div>
                <div className="lab-content__item">
                  <div className="lab-content__item-bg">
                    <Image
                      className="img"
                      src={"/images/bg-paper.jpg"}
                      alt="work-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-project">
                    <Image
                      className="img"
                      src={"/images/lab-1.png"}
                      alt="lab-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-dots --left">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <div className="lab-content__item-content --right">
                    <p>Agence Vincent Dubuc</p>
                    <p>Branding / Web</p>
                  </div>
                </div>
                <div className="lab-content__item --span">
                  <div className="lab-content__item-bg">
                    <Image
                      className="img"
                      src={"/images/bg-paper.jpg"}
                      alt="work-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-project">
                    <Image
                      className="img"
                      src={"/images/lab-1.png"}
                      alt="lab-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-dots --top-between">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <div className="lab-content__item-content --right">
                    <p>Agence Vincent Dubuc</p>
                    <p>Branding / Web</p>
                  </div>
                </div>
                <div className="lab-content__item">
                  <div className="lab-content__item-bg">
                    <Image
                      className="img"
                      src={"/images/bg-paper.jpg"}
                      alt="work-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-project">
                    <Image
                      className="img"
                      src={"/images/lab-1.png"}
                      alt="lab-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-dots --right">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <div className="lab-content__item-content --left">
                    <p>Agence Vincent Dubuc</p>
                    <p>Branding / Web</p>
                  </div>
                </div>
                <div className="lab-content__item">
                  <div className="lab-content__item-bg">
                    <Image
                      className="img"
                      src={"/images/bg-paper.jpg"}
                      alt="work-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-project">
                    <Image
                      className="img"
                      src={"/images/lab-1.png"}
                      alt="lab-1"
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-dots --left">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <div className="lab-content__item-content --right">
                    <p>Agence Vincent Dubuc</p>
                    <p>Branding / Web</p>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LabPage;
