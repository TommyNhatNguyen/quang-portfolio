import Image from "next/image";
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
        <div className="work-list__item"></div>
      </div>
    </div>
  );
};

export default WorkComponent;
