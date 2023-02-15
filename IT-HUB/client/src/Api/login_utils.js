import axios from "axios";
import { redirect } from "react-router-dom";

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

export const validateRegister = async ({request}) => {
  const formData = await request.formData();

  const registerData = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    DOB: formData.get("DOB"),
    level: formData.get("level")
  };

  // console.log(registerData);
  try {
      const response = await axios.post('api/users/register', registerData);
      return response;
      
      // const data = await response;
      // console.log(data)
  }
  catch (error) {
    console.log(error);
    return error.response;
  }
};

export const forgotPassword = async ({request}) => {
  const formData = await request.formData();

  const forgotData = {
    email: formData.get("email")
  };

  try {
      const response = await axios.post('api/users/forgotpassword', forgotData);
      return response;
      
  }
  catch (error) {
    console.log(error);
    return error.response;
  }
};
