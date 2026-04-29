import { Article } from "@/app/interfaces/article.interface";
import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 9;

export interface BlogFilters {
  category?: string | null;
  intel_level?: string | null;
  read_time?: string | null;
}

export const useBlogArticles = (filters: BlogFilters) => {
  const getKey = (
    pageIndex: number,
    prev: HeadlessCMSResponse<Article[]> | null,
  ) => {
    if (prev && prev.data.length === 0) return null;
    return [
      "/articles",
      {
        populate: "*",
        pagination: { page: pageIndex + 1, pageSize: PAGE_SIZE },
        filters: {
          categories: {
            type: { $eq: "blog" },
            ...(filters.category ? { slug: { $eq: filters.category } } : {}),
          },
          ...(filters.intel_level
            ? { intel_level: { slug: { $eq: filters.intel_level } } }
            : {}),
          ...(filters.read_time
            ? { read_time: { slug: { $eq: filters.read_time } } }
            : {}),
        },
      },
    ];
  };

  const { data, size, setSize, isLoading } = useSWRInfinite<
    HeadlessCMSResponse<Article[]>
  >(getKey, swrFetcher);

  const articles = data?.flatMap((p) => p.data) ?? [];
  const pageCount = data?.[data.length - 1]?.meta?.pagination?.pageCount ?? 1;
  const hasMore = size < pageCount;

  return { articles, hasMore, loadMore: () => setSize(size + 1), isLoading };
};
