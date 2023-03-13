import { redirect } from "react-router-dom";
import { customAxios } from "../App";
import { client } from "./queryClient";

export const getCourse = async () => {
  try {
    const data = await customAxios.get("/course/all");
    return data.data;
  } catch (error) {
    throw new Error();
  }
};

export const getRecommend = async () => {
  const queryFn = async () => {
    try {
      const data = await customAxios.get("/course/recommend");
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  // const user = client.getQueryData(["user"]);
  // if (!user) throw new Error();

  return client.fetchQuery(["recommend"], queryFn);
};

export const getPage = async ({ params }) => {
  try {
    const { id } = params;
    const data = await customAxios.get(`/course/pages/${id}`);
    return data.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};

export const searchCourse = async ({ request }) => {
  const url = new URL(request.url);
  const search_params = url.searchParams.get("course");
  try {
    const data = await customAxios.get(`/course/search/?search=${search_params}`);
    client.invalidateQueries(["recommend"]);
    return data.data;
  } catch (error) {
    return redirect("/course");
  }
};
