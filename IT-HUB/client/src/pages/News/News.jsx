import { useLoaderData, Link, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";
import "./NewsStyles.scss";
import { convertToYDHMS } from "../../Utils/dateConverter";
import { shuffle } from "../../Utils/suffle";

const News = () => {
  let [news1, news2] = useLoaderData();
  news1 = news1.articles;
  news2 = news2.articles;
  const news = news2.concat(news1);

  if (useNavigation().state === "loading") return <Loader />;
  return (
    <div className="wrapper">
      {news.map((item) => {
        return (
          <div className="card" key={item.url}>
            <div className="card-body">
              <img className="card-image" src={item?.urlToImage} alt="" />
              <h2 className="card-title">{item.title}</h2>
              <h3 className="card-description">{item.description}</h3>
              <h4 className="card-author">{item.author}</h4>
              <h4 className="card-publishedAt">{convertToYDHMS(item.publishedAt)} ago</h4>
              <h4 className="card-sourcename">{item.source.name}</h4>
            </div>
            <Link to={item.url} target="_blank">
              <button className="card-btn" type="button">
                Read more
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default News;
