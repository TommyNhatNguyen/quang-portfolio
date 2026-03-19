"use client";
import ArrowDownFilled from "@/app/components/icons/arrow-down-filled";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import "../../styles/blog-component.scss";
import BlogDetailPage from "./blog-detail";

const FILTERS = [
  {
    id: "read_time",
    label: "read_time",
    options: ["Quick Scan", "Deep Dive"],
  },
  {
    id: "intel_level",
    label: "intel_level",
    options: ["Basic", "Advanced"],
  },
  {
    id: "unit_type",
    label: "unit_type",
    options: ["Case Study", "Article"],
  },
];

const BlogComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterToggle, setFilterToggle] = useState<Record<string, boolean>>(
    () =>
      FILTERS.reduce(
        (acc, filter) => ({
          ...acc,
          [filter.id]: false,
        }),
        {} as Record<string, boolean>,
      ),
  );
  const [selectedBlog, setSelectedBlog] = useState<number | null>(null);

  if (selectedBlog !== null) {
    return <BlogDetailPage onBack={() => setSelectedBlog(null)} />;
  }

  const hasActiveFilter = FILTERS.some(
    (filter) => searchParams.get(filter.id) !== null,
  );

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    FILTERS.forEach((filter) => {
      params.delete(filter.id);
    });
    router.push(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
    );
    setFilterToggle(
      FILTERS.reduce(
        (acc, filter) => ({
          ...acc,
          [filter.id]: false,
        }),
        {} as Record<string, boolean>,
      ),
    );
  };

  return (
    <div className="blog-container">
      <div className="blog-scroll">
        <div className="blog-content">
          <h2 className="blog-content__title">My Insights</h2>
          <div className="blog-content__filter">
            <div className="blog-content__filter-header">
              <div className="blog-content__filter-title">Filter by</div>
              {hasActiveFilter && (
                <button
                  type="button"
                  className="blog-content__filter-clear"
                  onClick={handleClearAll}
                >
                  Clear all
                </button>
              )}
            </div>
            <ul className="blog-content__filter-options">
              {FILTERS.map((filter) => (
                <li
                  key={filter.id}
                  className={`option ${
                    filterToggle[filter.id] ? "--active" : ""
                  }`}
                  onClick={() =>
                    setFilterToggle((prev) => ({
                      ...prev,
                      [filter.id]: !prev[filter.id],
                    }))
                  }
                >
                  <div className="option__wrapper">
                    <span className="option__wrapper-title">
                      {filter.label}
                    </span>
                    <div className="option__wrapper-icon">
                      <ArrowDownFilled className="svg" />
                    </div>
                  </div>
                  <ul className="option__list">
                    {filter.options.map((option) => {
                      const currentValue = searchParams.get(filter.id);
                      const isActive = currentValue === option;
                      return (
                        <li
                          key={option}
                          className={`option__list-item ${
                            isActive ? "--active" : ""
                          }`}
                          onClick={(event) => {
                            event.stopPropagation();
                            const params = new URLSearchParams(
                              searchParams.toString(),
                            );
                            if (isActive) {
                              params.delete(filter.id);
                            } else {
                              params.set(filter.id, option);
                            }
                            router.push(
                              `${pathname}${
                                params.toString() ? `?${params.toString()}` : ""
                              }`,
                            );
                          }}
                        >
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <ul className="blog-content__list">
            {Array.from({ length: 9 }).map((_, index) => {
              return (
                <li key={index} className="blog-content__list-item">
                  <div className="card" onClick={() => setSelectedBlog(index)}>
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
