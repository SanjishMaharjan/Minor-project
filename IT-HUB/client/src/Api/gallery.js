import axios from "axios";
import { redirect } from "react-router-dom";
import { galleryUpdateSchema } from "../validation/galleryupdateSchema";
import { validator } from "../validation/validator";

import { client } from "./queryClient";

export const getEvents = async () => {
  const queryFn = async () => {
    const { data } = await axios.get(`/api/event`);
    console.log(data);
    return data;
  };

  return client.fetchQuery(["gallery"], queryFn);
};

export const postImages = async ({ request }) => {
  const formData = await request.formData();
  const post = {
    title: formData.get("title"),
    description: formData.get("description"),
    images: formData.get("images"),
  };

  const res = await validator(post, galleryUpdateSchema);

  if (res.status === 403) return res;
  try {
    const response = await axios.post("/api/admin/uploadimages", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.status === 200) throw Error("cannot post data");

    client.invalidateQueries(["gallery"]);
    return response;
  } catch (error) {
    return error.response;
  }
  // return redirect("/events");
};
