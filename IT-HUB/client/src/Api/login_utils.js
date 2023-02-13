import axios from "axios";

export const validateLogin = async ({ request }) => {
  const formData = await request.formData();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await axios.post("/api/users/login", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
