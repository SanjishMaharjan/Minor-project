import HashLoader from "react-spinners/HashLoader";
// import news from "./news.json"
import { useLoaderData, Link, useNavigation } from "react-router-dom";
import "./NewsStyles.css";

const News = () => {

  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return (
      <>
        <div className="loader">
          <HashLoader color="#36d7b7" />
        </div>
      </>
    );
  }

  let news = useLoaderData();
  news = news.articles;
  // // Fetch from api
  // const [news, setNews] = useState([]);
  // const getdata = async () => {
  //   const response = await fetch(
  //     "https://newsapi.org/v2/everything?sources=techcrunch&apiKey=865e883c8ad24ef887af1e71b6feef2d"
  //   );
  //   const data = await response.json();
  //   console.log(data.articles);
  //   setNews(data.articles);
  // };

  // useEffect(() => {
  //   getdata();
  // }, []);

  return (
    // <div className='wrapper'>
    //   {news.map((item) => {
    //     return (

    //       <div className="card">
    //         <div className="card_body">
    //           <img className="card_image" src={item.image} alt="" />
    //           <h2 className="card_title">{item.title}</h2>
    //           {/* <p className="card__descript">{props.descript}</p> */}
    //         </div>
    //         <a href={item.href}><button className="card_btn" type="button">Read more</button></a>
    //       </div>

    < div className="wrapper" >
      {
        news.map((item) => {
          return (
            <div className="card">
              <div className="card-body">
                <img className="card-image" src={item.urlToImage} alt="" />
                <h2 className="card-title">{item.title}</h2>
                <h3 className="card-description">{item.description}</h3>
                <h4 className="card-author">{item.author}</h4>
                <h4 className="card-publishedAt">{item.publishedAt}</h4>
                <h4 className="card-sourcename">{item.source.name}</h4>
              </div>
              <Link to={item.url} target="_blank">
                <button className="card-btn" type="button">
                  Read more
                </button>
              </Link>
            </div>
          );
        })
      }
    </div >
  );
};

export default News;

export const fetchNews = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/everything?sources=techcrunch&apiKey=865e883c8ad24ef887af1e71b6feef2d"
  );
  return response.json();
};
