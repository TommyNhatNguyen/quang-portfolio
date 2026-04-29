import { Article } from "@/app/interfaces/article.interface";
import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import useSWR from "swr";

export const useArticle = (slug: string) => {
  const { data, isLoading } = useSWR<HeadlessCMSResponse<Article[]>>(
    slug ? ["/articles", { filters: { slug: { $eq: slug } }, populate: "*" }] : null,
    swrFetcher,
  );
  return { article: data?.data?.[0] ?? null, isLoading };
};
