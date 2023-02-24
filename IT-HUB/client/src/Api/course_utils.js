import { redirect } from "react-router-dom";
import { customAxios } from "../App";

export const getCourse = async () => {
  try {
    const data = await customAxios.get("/course/all");
    return data.data;
  } catch (error) {
    return error.response;
  }
};

export const getRecommend = async () => {
  try {
    const data = await customAxios.get("/course/recommend");
    return data.data;
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      throw new Error(error.response.data.detail);
    }
  }
};

export const getPage = async ({ params }) => {
  try {
    const { id } = params;
    const data = await customAxios.get(`/course/pages/${id}`);
    return data.data;
  } catch (error) {
    return error.response;
  }
};

export const searchCourse = async ({ request }) => {
  const url = new URL(request.url);
  const search_params = url.searchParams.get("course");
  try {
    const data = await customAxios.get(`/course/search/?search=${search_params}`);
    console.log(data);
    return data.data;
  } catch (error) {
    console.log(error);
    return redirect("/course");
  }
};
