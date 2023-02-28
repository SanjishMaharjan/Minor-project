import * as Yup from "yup";

export const postAnswerSchema = Yup.object().shape({
  answer: Yup.string()
    .min(5, "Answer should be at least 5 characters")
    .required("Answer is required"),
});
