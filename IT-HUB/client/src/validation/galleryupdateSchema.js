import * as Yup from "yup";

export const galleryUpdateSchema = Yup.object().shape({
  title: Yup.string()
    // .min(5, "Title should be at least 5 characters")
    .required("Title is required"),
  description: Yup.string()
  .min(5, "Description should be at least 5 characters")
  .required("Description is required"),
  images: Yup.mixed()
  .test("fileSize", "File size must be less than 2MB", (value) => {
    if (!value) return true; // no file was selected
    return value.size <= 2000000; // file size is less than or equal to 200kb
  })
  .required("File is required"),
});