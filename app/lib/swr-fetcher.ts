import axiosInstance from "@/app/utils/axiosInstance";
import { qs } from "@/app/utils/qs";

export const swrFetcher = async ([url, params]: [string, object?]) => {
  const query = params ? qs.stringify(params, { encodeValuesOnly: true }) : "";
  const response = await axiosInstance.get(query ? `${url}?${query}` : url);
  return response.data;
};
