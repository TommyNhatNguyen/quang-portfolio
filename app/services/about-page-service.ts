import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import axiosInstance from "../utils/axiosInstance";

export const aboutPageService = {
  getAboutPage: async (): Promise<HeadlessCMSResponse<any>> => {
    const response = await axiosInstance.get("/about-page", {
      params: {
        populate: {
          song_audio_file: true,
          sections: {
            populate: {
              section_items: {
                populate: "*",
              },
            },
          },
        },
      },
    });
    return response.data;
  },
};
