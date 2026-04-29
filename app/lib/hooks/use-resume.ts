import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { Resume } from "@/app/interfaces/resume-interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import useSWR from "swr";

export const useResume = () => {
  const { data, isLoading } = useSWR<HeadlessCMSResponse<Resume>>(
    SWR_KEYS.resume,
    swrFetcher,
  );
  return { resume: data?.data ?? null, isLoading };
};
