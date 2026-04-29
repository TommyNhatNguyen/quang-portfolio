"use client";

import ArrowDownFilled from "@/app/components/icons/arrow-down-filled";
import { useBlogArticles } from "@/app/lib/hooks/use-blog-articles";
import { useBlogFilters } from "@/app/lib/hooks/use-blog-filters";
import "@/app/styles/blog-component.scss";
import { getImage } from "@/app/utils/getImage";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

const BlogPageInner = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { categories, intelLevels, readTimes } = useBlogFilters();

  const activeFilters = useMemo(
    () => ({
      category: searchParams.get("category"),
      intel_level: searchParams.get("intel_level"),
      read_time: searchParams.get("read_time"),
    }),
    [searchParams],
  );

  const { articles, hasMore, loadMore } = useBlogArticles(activeFilters);

  const filterOptions = useMemo(
    () => [
      {
        id: "category",
        label: "Category",
        options: categories.map((c) => ({
          label: c.category_name,
          value: c.slug,
        })),
      },
      {
        id: "intel_level",
        label: "Intel Level",
        options: intelLevels.map((i) => ({
          label: i.intel_level,
          value: i.slug,
        })),
      },
      {
        id: "read_time",
        label: "Read Time",
        options: readTimes.map((r) => ({ label: r.read_time, value: r.slug })),
      },
    ],
    [categories, intelLevels, readTimes],
  );

  const [filterToggle, setFilterToggle] = useState<Record<string, boolean>>({});

  const hasActiveFilter = filterOptions.some(
    (filter) => searchParams.get(filter.id) !== null,
  );

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    filterOptions.forEach((filter) => {
      params.delete(filter.id);
    });
    router.push(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
    );
    setFilterToggle(
      filterOptions.reduce(
        (acc, filter) => ({ ...acc, [filter.id]: false }),
        {} as Record<string, boolean>,
      ),
    );
  };

  return (
    <div className="blog-container">
      <div className="blog-scroll">
        <div className="blog-content">
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
              {filterOptions.map((filter) => (
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
                      const isActive = currentValue === option.value;
                      return (
                        <li
                          key={option.value}
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
                              params.set(filter.id, option.value);
                            }
                            router.push(
                              `${pathname}${
                                params.toString() ? `?${params.toString()}` : ""
                              }`,
                            );
                          }}
                        >
                          {option.label}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <ul className="blog-content__list">
            {articles.map((article) => {
              const readTime = article.read_time;
              const intelLevel = article.intel_level;

              if (article.is_link) {
                return (
                  <li key={article.id} className="blog-content__list-item">
                    <Link
                      href={article.link ?? "#"}
                      className="card"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="card__header">
                        <span className="card__header-title">
                          {article.categories
                            .map((c) => c.category_name)
                            .join(" / ")}
                        </span>
                      </div>
                      <div className="card__body">
                        <div className="card__body-title">
                          <h3>{article.title}</h3>
                        </div>
                        <div className="card__body-content">
                          <div className="thumbnail">
                            <Image
                              src={getImage(article.thumbnail.url)}
                              alt={article.title}
                              width={370}
                              height={300}
                            />
                          </div>
                          <div className="reader">
                            {readTime && (
                              <div className="reader__time">
                                <p className="reader__time-value">
                                  {readTime.read_time}
                                </p>
                              </div>
                            )}
                            {intelLevel && (
                              <div className="reader__category">
                                <span>{intelLevel.intel_level}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="card__body-desc">
                          <p>{article.short_description}</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              }

              return (
                <li key={article.id} className="blog-content__list-item">
                  <Link href={`/blog/${article.slug}`} className="card">
                    <div className="card__header">
                      <span className="card__header-title">
                        {article.categories
                          .map((c) => c.category_name)
                          .join(" / ")}
                      </span>
                    </div>
                    <div className="card__body">
                      <div className="card__body-title">
                        <h3>{article.title}</h3>
                      </div>
                      <div className="card__body-content">
                        <div className="thumbnail">
                          <Image
                            src={getImage(article.thumbnail.url)}
                            alt={article.title}
                            width={370}
                            height={300}
                          />
                        </div>
                        <div className="reader">
                          {readTime && (
                            <div className="reader__time">
                              <p className="reader__time-value">
                                {readTime.read_time}
                              </p>
                            </div>
                          )}
                          {intelLevel && (
                            <div className="reader__category">
                              <span>{intelLevel.intel_level}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="card__body-desc">
                        <p>{article.short_description}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {hasMore && (
          <button className="btn btn-loadmore" onClick={loadMore}>
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

const BlogPage = () => {
  return (
    <Suspense>
      <BlogPageInner />
    </Suspense>
  );
};

export default BlogPage;
