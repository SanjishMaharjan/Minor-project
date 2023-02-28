import images from "./images.json";
import { useNavigation, useLoaderData, Link, useParams, Form } from "react-router-dom";
import Loader from "../../components/Loader";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { shuffle } from "../../utils/suffle.js";
import "./CoursesStyles.scss";

import { customAxios } from "../../App";
import Star from "../../components/Star";

const Courses = () => {
  if (useNavigation().state === "loading") return <Loader />;
  const [courses, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  let url = [images][0];
  url = shuffle(url);
  url = Array.from({ length: 100 }, () => url).flatMap((array) => array);
  const { id } = useParams();

  const postClick = async (course_name) => {
    await customAxios.post(`/course/${course_name}`);
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    console.log("reached");
    const response = await customAxios.get(`/course/pages/${page}`);
    const data = await response.data;
    setItems([...courses, ...data]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="course-header">
        <h1>Courses</h1>
        <Form method="get" action="/search">
          <HiMagnifyingGlass />
          <input name="course" type="text" placeholder="Browse Courses" />
          <button type="submit">Search</button>
        </Form>

        <div className="course-pages">
          <Link to="/course/recommend">
            <button className={!id && "select"}>Recommended</button>
          </Link>
          <Link to="/course/pages/1">
            <button className={id && "select"}>ALL</button>
          </Link>
        </div>
      </div>

      <div className="course-container">
        <InfiniteScroll
          dataLength={courses.length}
          next={fetchCourse}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          {courses.map((course, i) => {
            return (
              <div key={course._id}>
                <div>
                  <Link to={course.course_url}>
                    <img src={url[i].url} alt="" onClick={() => postClick(course.course_name)} />
                  </Link>
                  <h2>{course.course_name}</h2>
                  <p>{course.course_description.substring(0, 100) + "..."}</p>
                </div>
                <h3>
                  <Star rating={course.course_rating} />
                  <span>{course.Difficulty_level}</span>
                </h3>
                <Link to={course.course_url}>
                  <button type="button" onClick={() => postClick(course.course_name)}>
                    Read more
                  </button>
                </Link>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Courses;
