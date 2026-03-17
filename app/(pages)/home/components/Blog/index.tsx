"use client";
import ArrowDownFilled from "@/app/components/icons/arrow-down-filled";
import Image from "next/image";
import { useState } from "react";
import "../../styles/blog-component.scss";

const BlogComponent = () => {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <div className="blog-container">
      <div className="blog-scroll">
        <div className="blog-content">
          <h2 className="blog-content__title">My Insights</h2>
          <div className="blog-content__filter">
            <div className="blog-content__filter-title">Filter by</div>
            <ul className="blog-content__filter-options">
              <li
                className={`option ${isToggle ? "--active" : ""}`}
                onClick={() => setIsToggle((prev) => !prev)}
              >
                <div className="option__wrapper">
                  <span className="option__wrapper-title">read_time</span>
                  <div className="option__wrapper-icon">
                    <ArrowDownFilled className="svg" />
                  </div>
                </div>
                <ul className="option__list">
                  <li className="option__list-item">Quick Scan</li>
                  <li className="option__list-item">Deep Dive</li>
                </ul>
              </li>
              <li
                className={`option ${isToggle ? "--active" : ""}`}
                onClick={() => setIsToggle((prev) => !prev)}
              >
                <div className="option__wrapper">
                  <span className="option__wrapper-title">read_time</span>
                  <div className="option__wrapper-icon">
                    <ArrowDownFilled className="svg" />
                  </div>
                </div>
                <ul className="option__list">
                  <li className="option__list-item">Quick Scan</li>
                  <li className="option__list-item">Deep Dive</li>
                </ul>
              </li>
              <li
                className={`option ${isToggle ? "--active" : ""}`}
                onClick={() => setIsToggle((prev) => !prev)}
              >
                <div className="option__wrapper">
                  <span className="option__wrapper-title">read_time</span>
                  <div className="option__wrapper-icon">
                    <ArrowDownFilled className="svg" />
                  </div>
                </div>
                <ul className="option__list">
                  <li className="option__list-item">Quick Scan</li>
                  <li className="option__list-item">Deep Dive</li>
                </ul>
              </li>
            </ul>
          </div>
          <ul className="blog-content__list">
            {Array.from({ length: 9 }).map((_, index) => {
              return (
                <li key={index} className="blog-content__list-item">
                  <div className="card">
                    <div className="card__header">
                      <span className="card__header-title">CASE_STUDY</span>
                    </div>
                    <div className="card__body">
                      <div className="card__body-title">
                        <h3>
                          Mastering the Art of Color Theory: A Visual Designers
                          Guide Mastering the Art of Color Theory: A Visual
                          Designers Guide
                        </h3>
                      </div>
                      <div className="card__body-content">
                        <div className="thumbnail">
                          <Image
                            src="/images/bg-paper.jpg"
                            alt="background paper"
                            width={370}
                            height={300}
                          />
                        </div>
                        <div className="reader">
                          <div className="reader__time">
                            <p className="reader__time-value">15</p>
                            <p className="reader__time-unit">min</p>
                          </div>
                          <div className="reader__category">
                            <span>BASIC</span>
                          </div>
                        </div>
                      </div>
                      <div className="card__body-desc">
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Quibusdam possimus voluptate maiores rem.
                          Provident, dolores aut officiis autem quasi vero eos
                          eum, eveniet at, incidunt quae laboriosam doloribus
                          corrupti? Assumenda. Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Omnis enim totam quia
                          modi voluptatem, suscipit cumque consectetur quas vel
                          doloribus sunt similique iste. Nostrum aliquam magni
                          quae harum corporis numquam.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
