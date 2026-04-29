import { Avatar } from "../interfaces/avatar.interface";
import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import axiosInstance from "../utils/axiosInstance";

export const avatarService = {
  getAvatar: async (): Promise<HeadlessCMSResponse<Avatar>> => {
    const response = await axiosInstance.get("/avatar-card", {
      params: {
        populate: "*",
      },
    });
    return response.data;
  },
};
