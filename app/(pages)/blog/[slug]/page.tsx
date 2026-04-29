"use client";

import Breadcrumbs from "@/app/components/breadcrumbs";
import FileCopyLine from "@/app/components/icons/file-copy-line";
import StackShare from "@/app/components/icons/stackshare";
import { Article } from "@/app/interfaces/article.interface";
import { articlesService } from "@/app/services/articles-service";
import "@/app/styles/blog-page-detail.scss";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const fetchArticleBySlug = async (slug: string) => {
  const response = await articlesService.getArticleBySlug(slug);
  return response.data;
};

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  console.log("🚀 ~ BlogDetailPage ~ article:", article);
  useEffect(() => {
    (async () => {
      const article = await fetchArticleBySlug(slug);
      setArticle(article[0]);
    })();
  }, [slug]);
  const articleTitle = article?.title;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: articleTitle, url });
        toast.success("Shared successfully");
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
    } else {
      await handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="wrapper">
      <div className="blog-page-detail">
        <header>
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              {
                label:
                  article?.categories
                    ?.map((c) => c?.category_name)
                    .join(" / ") ?? "",
              },
              { label: article?.title ?? "" },
            ]}
          />
          <h1>{article?.title}</h1>
          <p>{article?.short_description}</p>
        </header>

        <div className="header-actions">
          <div className="article">
            {article?.read_time?.read_time && (
              <div className="article__time">
                <p className="article__time-value">
                  {article?.read_time?.read_time ?? 0}
                </p>
              </div>
            )}
            {article?.intel_level?.intel_level && (
              <div className="article__category">
                <span>{article?.intel_level?.intel_level ?? ""}</span>
              </div>
            )}
          </div>
          <nav className="article-actions" aria-label="Article actions">
            <button className="btn-action" type="button" onClick={handleShare}>
              <div className="btn-action-icon">
                <StackShare />
              </div>
              <span className="btn-action-text">Share</span>
            </button>
            <button
              className="btn-action"
              type="button"
              onClick={handleCopyLink}
            >
              <div className="btn-action-icon">
                <FileCopyLine />
              </div>
              <span className="btn-action-text">Copy link</span>
            </button>
          </nav>
        </div>

        {article?.content && <BlocksRenderer content={article?.content} />}

        <footer>
          <span>Decode_date:</span>
          <time dateTime={article?.createdAt}>
            {article?.createdAt
              ? new Date(article?.createdAt).toLocaleDateString("vi-VN")
              : ""}
          </time>
        </footer>
      </div>
    </div>
  );
};

export default BlogDetailPage;
