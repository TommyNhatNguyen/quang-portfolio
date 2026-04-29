import { Header } from "@/app/interfaces/header.interface";
import axiosInstance from "../utils/axiosInstance";
import { qs } from "../utils/qs";
import { HeadlessCMSResponse } from "../interfaces/reponse.interface";

export const headerService = {
  getHeader: async (): Promise<HeadlessCMSResponse<Header>> => {
    const queryParams = qs.stringify({ populate: "socials" });
    const response = await axiosInstance.get(`/header?${queryParams}`);
    return response.data;
  },
};
