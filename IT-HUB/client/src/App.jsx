import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RequireLogin from "./components/RequireLogin";
import RequireAdmin from "./components/RequireAdmin";

import { AuthContextProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";

import Layout from "./pages/Navbar/Layout";

import Courses from "./pages/Courses/Courses";
import Gallery from "./pages/Gallery/Gallery";
import Events from "./pages/Eventss/Events";
import Home from "./pages/Landing_page/Home";
import News from "./pages/News/News";
import About from "./pages/About/About";

import Login from "./pages/Login/Login";
import LogOut from "./pages/Login/logout";
import Register from "./pages/Login/Register";
import StudentProfile from "./pages/StudentProfile/StudentProfile";
import ForgotPassword from "./pages/Login/ForgotPassword";
import MainAdmin from "./pages/Admin_pannel/MainAdmin";
import CreatePoll from "./pages/Admin_pannel/CreatePoll";
import EditContent from "./pages/Admin_pannel/EditContent/EditContent";
import AdminNotification from "./pages/Admin_pannel/AdminNotification";

import PostQuestion from "./pages/Discussion_Arena/PostQuestion";
import Questions from "./pages/Discussion_Arena/Questions";
import Answer from "./pages/Discussion_Arena/Answer";

import ErrorHandler from "./pages/Error/ErrorHandler";
import Handle404 from "./pages/Error/Handle404";

import { fetchNews } from "./Api/news_utils";
import {
  getQuestion,
  getAnswer,
  postQuestion,
  deleteQuestion,
  commentQuestion,
  upvoteQuestion,
} from "./Api/discussion_utils";
import { forgotPassword, verifyUser, validateRegister, handleLogin } from "./Api/login_utils";
import { fetchProfile } from "./Api/profile";
import { getImages, postImages } from "./Api/gallery";

import { getCourse, getRecommend, getPage, searchCourse } from "./Api/course_utils";
import ManageEvents from "./pages/Admin_pannel/ManageEvents/ManageEvents";
import SideBar from "./pages/Admin_pannel/SideBar";
import Recommended from "./pages/Courses/Recommend";
import Notification from "./pages/Notification/Notification";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

export const customAxios = axios.create({
  baseURL: "http://localhost:8000",
});
customAxios.defaults.withCredentials = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="/course/recommend" loader={getRecommend} element={<Recommended />} />
      <Route path="/course" loader={getRecommend} element={<Courses />} />

      <Route path="/search" loader={searchCourse} element={<Recommended />} />

      <Route path="/course/pages/:id" loader={getPage} element={<Courses />} />
      <Route path="/news" element={<News />} errorElement={<ErrorHandler />} />

      <Route path="/question" loader={getQuestion} element={<Questions />} />

      <Route element={<RequireLogin />}>
        <Route
          path="/question/new"
          action={postQuestion}
          element={<PostQuestion />}
          errorElement={<ErrorHandler />}
        />
        <Route
          path="/question/:id"
          loader={getAnswer}
          element={<Answer />}
          action={commentQuestion}
        />
        <Route
          path="/question/:id/delete"
          action={deleteQuestion}
          errorElement={<h1>Cannot delete</h1>}
        />
        <Route
          path="/question/:id/upvote"
          action={upvoteQuestion}
          errorElement={<h1>Cannot upvote</h1>}
        />
        {/* <Route path="/:id/comment/new" action={commentQuestion} errorElement={<ErrorHandler />} /> */}
      </Route>

      <Route path="/events" loader={getImages} element={<Events />} />
      <Route path="/events" element={<Events />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/login"
        element={<Login />}
        action={handleLogin}
        errorElement={<ErrorHandler />}
      />
      <Route
        path="/verification/:id"
        loader={verifyUser}
        errorElement={<ErrorHandler />}
      />
      <Route path="/logout" element={<LogOut />} />
      <Route
        path="/register"
        element={<Register />}
        action={validateRegister}
        errorElement={<ErrorHandler />}
      />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/profile/:id" loader={fetchProfile} element={<StudentProfile />} />
      <Route
        path="/forgotpassword"
        element={<ForgotPassword />}
        action={forgotPassword}
        errorElement={<ErrorHandler />}
      />

      <Route element={<RequireAdmin />}>
        <Route
          // Here sidebar is the parent component who is child of navbar
          path="/admin"
          element={<SideBar />}
        >
          <Route index element={<MainAdmin />} />
          <Route path="createpoll" element={<CreatePoll />} />

          {/* <Route path="editcontent" element={<EditContent />} /> */}
          <Route
            path="editcontent"
            action={postImages}
            element={<EditContent />}
            errorElement={<ErrorHandler />}
          />

          <Route path="adminnotification" element={<AdminNotification />} />
          <Route path="manageevents" element={<ManageEvents />} />
        </Route>
        <Route path="notification" element={<Notification />} />
      </Route>

      <Route path="*" element={<Handle404 />} />
    </Route>
  )
);

const App = () => {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
