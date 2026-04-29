"use client";
import { useLabArticles } from "@/app/lib/hooks/use-lab-articles";
import "@/app/styles/lab-component.scss";
import { getImage } from "@/app/utils/getImage";
import Image from "next/image";
import Link from "next/link";

const LabPage = () => {
  const { articles } = useLabArticles();
  return (
    <div className="lab-container">
      <div className="lab-scroll">
        <div className="lab-content">
          {articles.map((article, index) => {
            const mod = index % 5;
            const isSpan = mod === 2;
            const dotsClass =
              mod === 2
                ? "--top-between"
                : mod === 0 || mod === 3
                  ? "--right"
                  : "--left";
            const contentClass = mod === 0 || mod === 3 ? "--left" : "--right";
            if (article.is_link) {
              return (
                <Link
                  key={article.id}
                  href={article.link ?? "#"}
                  className={`lab-content__item${isSpan ? " --span" : ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="lab-content__item-bg">
                    <Image
                      className="img"
                      src={"/images/bg-paper.jpg"}
                      alt=""
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className="lab-content__item-project">
                    <Image
                      className="img"
                      src={getImage(article.thumbnail.url)}
                      alt={article.title}
                      quality={100}
                      width={1200}
                      height={1200}
                    />
                  </div>
                  <div className={`lab-content__item-dots ${dotsClass}`}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                  <div className={`lab-content__item-content ${contentClass}`}>
                    <p>{article.title}</p>
                    <p
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {article.categories.map((c) => c.category_name).join(" / ")}
                    </p>
                  </div>
                </Link>
              );  
            }
            return (
              <div
                key={article.id}
                className={`lab-content__item${isSpan ? " --span" : ""}`}
              >
                <div className="lab-content__item-bg">
                  <Image
                    className="img"
                    src={"/images/bg-paper.jpg"}
                    alt=""
                    quality={100}
                    width={1200}
                    height={1200}
                  />
                </div>
                <div className="lab-content__item-project">
                  <Image
                    className="img"
                    src={getImage(article.thumbnail.url)}
                    alt={article.title}
                    quality={100}
                    width={1200}
                    height={1200}
                  />
                </div>
                <div className={`lab-content__item-dots ${dotsClass}`}>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                <div className={`lab-content__item-content ${contentClass}`}>
                  <p>{article.title}</p>
                  <p
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {article.categories.map((c) => c.category_name).join(" / ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LabPage;
