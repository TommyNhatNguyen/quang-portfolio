import { Article } from "../interfaces/article.interface";
import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import axiosInstance from "../utils/axiosInstance";

export const articlesService = {
  getArticles: async (): Promise<HeadlessCMSResponse<Article[]>> => {
    const response = await axiosInstance.get("/articles", {
      params: {
        populate: "*",
        filters: {
          categories: {
            type: {
              $eq: "work",
            },
          },
        },
      },
    });
    return response.data;
  },
};
