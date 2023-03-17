import axios from "axios";
import { redirect } from "react-router-dom";
import { galleryUpdateSchema } from "../validation/galleryupdateSchema";
import { validator } from "../validation/validator";

import { client } from "./queryClient";

export const getEvents = async () => {
  const queryFn = async () => {
    const { data } = await axios.get(`/api/event`);
    return data;
  };

  return client.fetchQuery(["events"], queryFn);
};

export const getUpCommingEvent = async ({ params }) => {
  const { id } = params;

  const queryFn = async () => {
    try {
      const { data } = await axios.get(`/api/event/${id}`);
      return data;
    } catch (error) {}
  };

  return client.fetchQuery(["upcommingEvents", id], queryFn);
};

export const editEvent = async ({ request, params }) => {
  const { id } = params;

  const formData = await request.formData();
  const post = {
    title: formData.get("title"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    location: formData.get("location"),
    images: formData.getAll("images"),
  };

  // const res = await validator(post, galleryUpdateSchema);

  // if (res.status === 403) return res;
  // /event/:eventId/images

  try {
    const response = await axios.patch(`/api/admin/event/${id}/images`, post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // if (!response.status === 200) throw Error("cannot post data");

    // client.invalidateQueries(["events"]);
    return redirect("/events");
  } catch (error) {
    return error.response;
  }
  // return redirect("/events");
};

//  title, description, startDate, endDate, location;
export const addEvent = async ({ request }) => {
  const formData = await request.formData();
  const post = {
    title: formData.get("title"),
    description: formData.get("description"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    location: formData.get("location"),
    name1: formData.get("name1"),
    name2: formData.get("name2"),
    phone1: formData.get("phone1"),
    phone2: formData.get("phone2"),
  };

  // const res = await validator(post, galleryUpdateSchema);

  // if (res.status === 403) return res;
  try {
    const response = await axios.post("/api/admin/event", post);

    if (!response.status === 200) throw Error("cannot post data");

    client.invalidateQueries(["events"]);
    return redirect("/events");
  } catch (error) {
    return error.response;
  }
};
