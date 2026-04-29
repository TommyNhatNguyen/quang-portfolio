import { AboutPage } from "@/app/interfaces/about-page.interface";
import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import useSWR from "swr";

export const useAboutPage = () => {
  const { data, isLoading } = useSWR<HeadlessCMSResponse<AboutPage>>(
    SWR_KEYS.aboutPage,
    swrFetcher,
  );
  return { aboutPage: data?.data ?? null, isLoading };
};
