import * as Yup from "yup";

export const profileUpdateSchema = Yup.object().shape({
//   title: Yup.string()
//     // .min(5, "Title should be at least 5 characters")
//     .required("Title is required"),
//   description: Yup.string()
//     .min(5, "Description should be at least 5 characters")
//     .required("Description is required"),
  image: Yup.mixed()
    .test("required", "Images is not selected", (value) => {
      return value.size > 0;
    })
    .test("fileSize", "File size must be less than 2MB", (value) => {
      if (!value) return false; // no file was selected
      return value.size <= 100000; // file size is less than or equal to 200kb
    }),
});
