import { customAxios } from "../App";

// export const fetchNews = async () => {
//   try {
//     const response = await fetch(
//       "https://newsapi.org/v2/everything?q=programming&sortBy=publishedAt&apiKey=865e883c8ad24ef887af1e71b6feef2d"
//     );
//     const response1 = await fetch(
//       "https://newsapi.org/v2/everything?sources=techcrunch&apiKey=865e883c8ad24ef887af1e71b6feef2d"
//     );
//     return Promise.all([response.json(), response1.json()]);
//   } catch (error) {
//     throw new Error("No internet Connection");
//   }
// };

export const fetchNews = async () => {
  try {
    const news = await customAxios.get("/news");
    console.log(news.data);
    return news.data;
  } catch (error) {
    console.log(error);
    throw new Error("No internet Connection");
  }
};
