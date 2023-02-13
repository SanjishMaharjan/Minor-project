import axios from "axios";

export const validateLogin = async (data) => {
  const response = await axios.post("http://localhost:5000/api/users/login", data);
  if (!response.status === 200) throw new Error("login failed");
};
