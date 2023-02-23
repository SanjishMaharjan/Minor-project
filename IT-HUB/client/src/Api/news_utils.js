export const fetchNews = async () => {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=programming&sortBy=publishedAt&apiKey=865e883c8ad24ef887af1e71b6feef2d"
    );
    const response1 = await fetch(
      "https://newsapi.org/v2/everything?sources=techcrunch&apiKey=865e883c8ad24ef887af1e71b6feef2d"
    );
    return Promise.all( [response.json(),response1.json()]);
  } catch (error) {
    throw new Error("No internet Connection");
  }
};


// https://newsapi.org/v2/everything?q=tesla&from=2023-01-23&sortBy=publishedAt&apiKey=API_KEY