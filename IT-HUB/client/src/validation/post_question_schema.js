import * as Yup from "yup";

export const postQuestionSchema = Yup.object().shape({
  question: Yup.string()
    .min(5, "Question should be at least 5 characters")
    // .matches(/(\w+\s){2}/, "Invalid question")
    .required("Question is required"),

  title: Yup.string()
    .min(5, "Title should be at least 5 characters")
    .required("Title is required")
    .max(100, "Question should be at most 100 characters"),
});
