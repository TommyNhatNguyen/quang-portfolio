import { Header } from "@/app/interfaces/header.interface";
import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import useSWR from "swr";

export const useHeader = () => {
  const { data, isLoading } = useSWR<HeadlessCMSResponse<Header>>(
    SWR_KEYS.header,
    swrFetcher,
  );
  return { header: data?.data ?? null, isLoading };
};
