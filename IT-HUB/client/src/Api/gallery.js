import axios from "axios";
import { redirect } from "react-router-dom";
import { galleryUpdateSchema } from "../validation/galleryupdateSchema";
import {validator} from "../validation/validator"

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
        images: formData.get("images"),
    }
   
    const res = await validator(post,galleryUpdateSchema);
    if (res.status==403) return res;
    // console.log(post);
    try{

        const response = await axios.post("/api/admin/uploadimages", post,{
            headers: {
                  "Content-Type": "multipart/form-data",
                }
    });
    
    console.log(response);
    if (!response.status === 200) throw Error("cannot post data");
  
    return response;
}
catch(error){
    console.log(error);
    return(error.response);
    
    
}
    // return redirect("/events");
};
