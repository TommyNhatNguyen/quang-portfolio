import { Category } from "../interfaces/article.interface";
import { HeadlessCMSResponse } from "../interfaces/reponse.interface";
import axiosInstance from "../utils/axiosInstance";
import { qs } from "../utils/qs";

export const categoryService = {
  getCategories: async (
    params: any,
  ): Promise<HeadlessCMSResponse<Category[]>> => {
    const queryParams = qs.stringify({
      ...params,
    });
    const response = await axiosInstance.get(`/categories?${queryParams}`);
    return response.data;
  },
};
