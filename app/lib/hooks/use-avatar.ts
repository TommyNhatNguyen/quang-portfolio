import { Avatar } from "@/app/interfaces/avatar.interface";
import { HeadlessCMSResponse } from "@/app/interfaces/reponse.interface";
import { swrFetcher } from "@/app/lib/swr-fetcher";
import { SWR_KEYS } from "@/app/lib/swr-keys";
import useSWR from "swr";

export const useAvatar = () => {
  const { data, isLoading } = useSWR<HeadlessCMSResponse<Avatar>>(
    SWR_KEYS.avatar,
    swrFetcher,
  );
  return { avatar: data?.data ?? null, isLoading };
};
