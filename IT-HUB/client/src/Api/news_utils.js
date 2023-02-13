export const fetchNews = async () => {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?sources=techcrunch&apiKey=865e883c8ad24ef887af1e71b6feef2d"
    );
    return response.json();
  } catch (error) {
    throw new Error("No internet Connection");
  }
};
