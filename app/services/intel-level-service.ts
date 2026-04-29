import { IntelLevel } from "../interfaces/intel-level.interface";
import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import axiosInstance from "../utils/axiosInstance";

export const intelLevelService = {
  getIntelLevel: async (): Promise<HeadlessCMSResponse<IntelLevel[]>> => {
    const response = await axiosInstance.get("/intel-levels");
    return response.data;
  },
};
