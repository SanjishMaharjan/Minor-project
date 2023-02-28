import * as Yup from "yup";

export const postQuestionSchema = Yup.object().shape({
  question: Yup.string()
    .min(5, "Question should be at least 5 characters")
    .matches(/(\w+\s){4}/, "Invalid question")
    .required("Question is required"),
});
