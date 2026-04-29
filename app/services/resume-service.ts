import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import { Resume } from "../interfaces/resume-interface";
import axiosInstance from "../utils/axiosInstance";
export const resumeService = {
  getResume: async (): Promise<HeadlessCMSResponse<Resume>> => {
    const response = await axiosInstance.get("/resume");
    return response.data;
  },
};
