import { ReadTime } from "../interfaces/read-me.interface";
import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import axiosInstance from "../utils/axiosInstance";

export const readTimeService = {
  getReadTime: async (): Promise<HeadlessCMSResponse<ReadTime[]>> => {
    const response = await axiosInstance.get("/read-times");
    return response.data;
  },
};
