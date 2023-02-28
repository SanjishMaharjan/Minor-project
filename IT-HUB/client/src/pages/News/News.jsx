import { useLoaderData, Link, useNavigation, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import "./NewsStyles.scss";
import { convertToYDHMS } from "../../Utils/dateConverter";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { customAxios } from "../../App";

const News = () => {
  if (useNavigation().state === "loading") return <Loader />;
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    console.log("reached");
    const response = await customAxios.get(`/news/pages/${page}`);
    const data = await response.data;
    setNews([...news, ...data]);
    setPage(page + 1);
    if (page >= 10) setHasMore(false);
  };

  return (
    <>
      <div className="news-header">
        <h1>Crunchy Bytes</h1>
      </div>
      <div className="news-wrapper">
        <InfiniteScroll
          dataLength={news.length}
          next={fetchNews}
          hasMore={hasMore}
          loader={<Loader />}
        >
          {news.map((item) => {
            return (
              <div key={item._id}>
                <div>
                  <Link to={item.link} target="_blank">
                    <img src={item.image} alt="" />
                  </Link>
                  <h2>{item.title}</h2>
                  <p>{item.description.substring(0, 100) + "..."}</p>
                </div>
                <Link to={item.link} target="_blank">
                  <button type="button">Read more</button>
                </Link>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default News;
