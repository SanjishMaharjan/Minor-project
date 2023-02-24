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
    <div className="news-wrapper">
      {news.map((item) => {
        return (
          <div key={item.url}>
            <img src={item?.urlToImage} alt="" />
            <h2>{item.title}</h2>
            <h3>{item.description}</h3>
            <h4>{item.author}</h4>
            <h4>{convertToYDHMS(item.publishedAt)} ago</h4>
            <h4>{item.source.name}</h4>
            <Link to={item.url} target="_blank">
              <button type="button">Read more</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default News;
