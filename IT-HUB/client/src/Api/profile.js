import axios from "axios";
import { validator } from "../validation/validator";
import { profileUpdateSchema } from "../validation/profileupdateSchema";

export const fetchProfile = async ({ params }) => {
  const { id } = params;
  const profile = await axios.get(`/api/users/profile/${id}`);
  console.log(profile.data);
  return profile.data;
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
}