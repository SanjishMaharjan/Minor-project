import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[a-zA-Z]+\.[a-zA-Z]+@lec\.edu\.np$/, "Invalid email address for lec domain")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .max(50, "Password must be at most 50 characters"),
  name: Yup.string()
    .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Invalid name format")
    .required("Name is required"),
  level: Yup.string().required("Level is required"),
});

export default RegisterSchema;
