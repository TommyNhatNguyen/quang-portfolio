import { Category } from "@/app/interfaces/article.interface";
import { IntelLevel } from "@/app/interfaces/intel-level.interface";
import { ReadTime } from "@/app/interfaces/read-me.interface";
import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import useSWR from "swr";

export const useBlogFilters = () => {
  const { data: catData } = useSWR<HeadlessCMSResponse<Category[]>>(
    SWR_KEYS.blogCategories,
    swrFetcher,
  );
  const { data: intelData } = useSWR<HeadlessCMSResponse<IntelLevel[]>>(
    SWR_KEYS.blogIntelLevels,
    swrFetcher,
  );
  const { data: readData } = useSWR<HeadlessCMSResponse<ReadTime[]>>(
    SWR_KEYS.blogReadTimes,
    swrFetcher,
  );

  return {
    categories: catData?.data ?? [],
    intelLevels: intelData?.data ?? [],
    readTimes: readData?.data ?? [],
  };
};
