import axios from "axios";
import { validator } from "../validation/validator";
import { profileUpdateSchema } from "../validation/profileupdateSchema";
import { client } from "./queryClient";

export const fetchProfile = async ({ params }) => {
  const { id } = params;
  const queryFn = async () => {
    const profile = await axios.get(`/api/users/profile/${id}`);
    return profile.data;
  };
  const user = client.getQueryData(["user"]);
  if (!user) throw new Error();

  return client.fetchQuery(["profile", id], queryFn);
};

export const changeProfileImage = async ({ request }) => {
  const formData = await request.formData();
  const post = {
    image: formData.get("image"),
  };
  console.log(post);

  // const res = await validator(post, profileUpdateSchema);
  // console.log(res);
  // if (res.status === 403) return res;
  try {
    const response = await axios.patch("/api/users/updateuser", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);
    if (!response.status === 200) throw Error("cannot post data");

    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
