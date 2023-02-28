import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[a-zA-Z]+\.[a-zA-Z]+@lec\.edu\.np$/, "Invalid email address for lec domain")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  name: Yup.string()
    .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, "Invalid name format")
    .required("Name is required"),
  DOB: Yup.string()
    .test("DOB", "Must be at least 15 years old", (value) => {
      const date = new Date(value);
      const ageDiffMs = Date.now() - date.getTime();
      const ageDate = new Date(ageDiffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      return age >= 15;
    })
    .test("DOB", "Invalid date format", (value) => {
      if (!value) {
        return true; // empty value is already caught by required validation
      }
      const date = new Date(value);
      return date instanceof Date && !isNaN(date);
    })
    .required("DOB is required"),
  level: Yup.string().required("Level is required"),
});

export default RegisterSchema;
