"use client";
import { Article } from "@/app/interfaces/article.interface";
import { articlesService } from "@/app/services/articles-service";
import "@/app/styles/lab-component.scss";
import { getImage } from "@/app/utils/getImage";
import Image from "next/image";
import { useEffect, useState } from "react";

const LabPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    (async () => {
      const response = await articlesService.getArticles({
        filters: {
          categories: {
            type: {
              $eq: "work",
            },
          },
        },
        populate: "*",
      });
      setArticles(response.data);
    })();
  }, []);
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
