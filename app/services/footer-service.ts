import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import axiosInstance from "../utils/axiosInstance";

export const footerService = {
  getFooter: async (): Promise<HeadlessCMSResponse<{ content_by: string }>> => {
    const response = await axiosInstance.get("/footer");
    return response.data;
  },
};
