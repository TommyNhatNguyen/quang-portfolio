import { Article } from "@/app/interfaces/article.interface";
import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import useSWR from "swr";

export const useLabArticles = () => {
  const { data, isLoading } = useSWR<HeadlessCMSResponse<Article[]>>(
    SWR_KEYS.labArticles,
    swrFetcher,
  );
  return { articles: data?.data ?? [], isLoading };
};
