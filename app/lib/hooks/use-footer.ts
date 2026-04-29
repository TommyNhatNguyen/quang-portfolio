import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import useSWR from "swr";

export const useFooter = () => {
  const { data, isLoading } = useSWR<HeadlessCMSResponse<{ content_by: string }>>(
    SWR_KEYS.footer,
    swrFetcher,
  );
  return { footer: data?.data ?? null, isLoading };
};
