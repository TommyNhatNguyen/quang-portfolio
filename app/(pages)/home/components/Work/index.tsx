import Image from "next/image";
import Link from "next/link";
import "../../styles/work-component.scss";

const WorkComponent = () => {
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
            Translating complex protocols into functional interfaces. Focused on
            utility, structure, and user autonomy.
          </h1>
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
                top: index != 0 ? `-${index * 28}px` : 0,
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

export default WorkComponent;
