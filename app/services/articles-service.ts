import { Article } from "../interfaces/article.interface";
import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import axiosInstance from "../utils/axiosInstance";
import { qs } from "../utils/qs";

export const articlesService = {
  getArticles: async (params: any): Promise<HeadlessCMSResponse<Article[]>> => {
    const queryParams = qs.stringify({
      ...params,
    });
    console.log("🚀 ~ queryParams:", queryParams);
    const response = await axiosInstance.get(`/articles?${queryParams}`);
    return response.data;
  },
  getArticleBySlug: async (
    slug: string,
    params?: any,
  ): Promise<HeadlessCMSResponse<Article[]>> => {
    const queryParams = qs.stringify({
      ...params,
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
    });
    const response = await axiosInstance.get(`/articles?${queryParams}`);
    return response.data;
  },
};
