import axios from "axios";
import { redirect } from "react-router-dom";
import { LoginSchema } from "../validation/login_schema";
import { RegisterSchema } from "../validation/register_schema";
import { validator } from "../validation/validator";

export const handleLogin = async ({ request }) => {
  const formData = await request.formData();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const res = await validator(data, LoginSchema);
  if (res.status === 403) return res;

  try {
    const response = await axios.post("/api/users/login", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const validateRegister = async ({ request }) => {
  const formData = await request.formData();

  const registerData = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    level: formData.get("level"),
  };

  const res = await validator(registerData, RegisterSchema);
  if (res.status === 403) return res;

  try {
    const response = await axios.post("api/users/register", registerData);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const forgotPassword = async ({ request }) => {
  const formData = await request.formData();

  const forgotData = {
    email: formData.get("email"),
  };

  try {
    const response = await axios.post("api/users/forgotpassword", forgotData);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const verifyUser = async ({ params }) => {
  const { id } = params;
  redirect("/login");
  try {
    const response = await axios.post(`api/users/verification/${id}`);
    return redirect("/login");
  } catch (error) {
    return error.response;
  }
};
