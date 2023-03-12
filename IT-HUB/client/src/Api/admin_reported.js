import axios from "axios";
import { client } from "./queryClient";


export const getReportedPosts = async () => {
    const queryFn = async () => {
        const { data } = await axios.get(`/api/admin/reported`);
        console.log(data);
        return data;
      };
    
      return client.fetchQuery(["reportedPost"], queryFn);
  
};
