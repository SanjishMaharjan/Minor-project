import images from "./images.json";
import { useNavigation, useLoaderData, Link, useParams, Form } from "react-router-dom";
import Loader from "../../components/Loader";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { shuffle } from "../../utils/suffle.js";
import "./recommend.scss";

import { customAxios } from "../../App";
import Star from "../../components/Star";

const Recommended = () => {
  if (useNavigation().state === "loading") return <Loader />;
  let url = [images][0];
  url = shuffle(url);
  let courses = useLoaderData();
  courses = shuffle(courses);

  let { id } = useParams();

  const postClick = async (course_name) => {
    await customAxios.post(`/course/${course_name}`);
  };

  if (courses && courses.status == 404) return <>Login to view course</>;

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

      <div className="recommend-course-container">
        {courses.map((course, i) => {
          return (
            <div key={course._id}>
              <div>
                <Link to={course.course_url}>
                  <img src={url[i].url} alt="" />
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
      </div>
    </>
  );
};

export default Recommended;
