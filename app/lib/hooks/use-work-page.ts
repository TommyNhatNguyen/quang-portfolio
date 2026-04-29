import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { WorkPage } from "@/app/interfaces/work-page.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import useSWR from "swr";

export const useWorkPage = () => {
  const { data, isLoading } = useSWR<HeadlessCMSResponse<WorkPage>>(
    SWR_KEYS.workPage,
    swrFetcher,
  );
  return { workPage: data?.data ?? null, isLoading };
};
