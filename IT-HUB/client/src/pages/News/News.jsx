import { Link, useNavigation } from "react-router-dom";
import Loader from "../../components/Loader";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "../../Api/news_utils";
import "./NewsStyles.scss";

const News = () => {
  if (useNavigation().state === "loading") return <Loader />;

  const { ref, inView } = useInView();

  const { status, data, fetchNextPage } = useInfiniteQuery(
    ["news"],
    ({ pageParam = 1 }) => fetchNews(pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 0 ? undefined : allPages.length + 1,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === "loading") return <Loader />;

  return (
    <>
      <div className="news-header">
        <h1>Crunchy Bytes</h1>
      </div>
      <div className="news-wrapper">
        {data.pages.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.map((item) => {
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
          </React.Fragment>
        ))}
      </div>
      <p ref={ref}> End of Crunchy Bytes </p>
    </>
  );
};

export default News;
