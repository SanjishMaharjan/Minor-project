import { customAxios } from "../App";

export const fetchNews = async (page) => {
  const response = await customAxios.get(`/news/pages/${page}`);
  const data = response.data;
  return data;
};
