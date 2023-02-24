import images from "./images.json";
import { useNavigation, useLoaderData, Link, useParams, Form } from "react-router-dom";
import Loader from "../../components/Loader";
import Pagination from "../../components/pagination";

import "./CoursesStyles.scss";

import { customAxios } from "../../App";
import Star from "../../components/Star";

function shuffle(array) {
  return array.sort(function () {
    return 0.5 - Math.random();
  });
}

const Courses = () => {
  let url = [images][0];
  url = shuffle(url);
  if (useNavigation().state === "loading") return <Loader />;
  let data = useLoaderData();
  data = shuffle(data);

  let { id } = useParams();

  const postClick = async (course_name) => {
    await customAxios.post(`/course/${course_name}`);
  };

  if (data && data.status == 404) return <>Login to view course</>;

  return (
    <>
      <div className="course-header">
        <h1 style={{ textAlign: "center" }}>Courses</h1>
        <div className="question-bar">
          <i
            style={{ marginRight: "1rem", fontSize: "2rem" }}
            className="fa-solid fa-magnifying-glass"
          ></i>
          <Form method="get" action="/search">
            <input
              name="course"
              className="post-question"
              type="text"
              placeholder="Browse Courses"
            />
            <button style={{ marginLeft: "1rem" }} type="submit">
              Search
            </button>
          </Form>
        </div>
      </div>

      <div className="course-container">
        <div className="container-content">
          <div className="category">
            <Link to="/course">
              <button className={!id && "select"}>Recommended</button>
            </Link>
            <Link to="/course/pages/1">
              <button className={id && "select"}>ALL</button>
            </Link>
          </div>
          {data.map((learn, i) => {
            return (
              <div className="course-card" key={learn._id}>
                <h2 className="course-title">{learn.course_name}</h2>
                <div className="course-content">
                  <img className="course-image" src={url[i].url} alt="" />
                  <h3 className="card-description">{learn.course_description}</h3>
                </div>
                <div
                  className="course-tag"
                  style={{
                    marginLeft: "2rem",
                    display: "flex",
                    justifyContent: "left",
                    gap: "2rem",
                  }}
                >
                  <h3>
                    <Star rating={learn.course_rating} />
                  </h3>
                </div>
                <a href={learn.course_url}>
                  <button
                    className="card-btn"
                    type="button"
                    onClick={() => postClick(learn.course_name)}
                  >
                    Read more
                  </button>
                </a>
              </div>
            );
          })}

          {id && <Pagination currentPage={Number(id)} totalPages={50} />}
        </div>
      </div>
    </>
  );
};

export default Courses;
