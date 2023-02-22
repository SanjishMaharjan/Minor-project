import axios from "axios";

export const fetchProfile = async ({ params }) => {
  const { id } = params;
  const profile = await axios.get(`/api/users/profile/${id}`);
  console.log(profile.data);
  return profile.data;
};