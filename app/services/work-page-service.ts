import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import { WorkPage } from "../interfaces/work-page.interface";
import axiosInstance from "../utils/axiosInstance";

export const workPageService = {
  getWorkPage: async (): Promise<HeadlessCMSResponse<WorkPage>> => {
    const response = await axiosInstance.get("/work-page", {
      params: {
        populate: {
          introduction: {
            populate: "*",
          },
          work_items: {
            populate: {
              work_cards: {
                populate: "*",
              },
            },
          },
        },
      },
    });
    console.log("🚀 ~ response:", response.data);
    return response.data;
  },
};
