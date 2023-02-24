import axios from "axios";
import { redirect } from "react-router-dom";

export const getImages = async () => {
  const images = await axios.get(`/api/users/getimages`);
  console.log(images);
  return images.data;
};

export const postImages = async ({ request }) => {
    const formData = await request.formData();
    const post = {
        title:formData.get("title"),
        description:formData.get("description"),
        images: formData.get("fileUpload"),
    }
    console.log(post);
    const res = await axios.post("/api/admin/uploadimages", post,{
        headers: {
                  "Content-Type": "multipart/form-data",
        }
    });
    
    console.log(res);
    if (!res.status === 200) throw Error("cannot post data");
  
    return redirect("/events");
};
