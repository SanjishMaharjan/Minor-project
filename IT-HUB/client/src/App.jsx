import axios from "axios";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./Api/queryClient";

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

// layout
import Layout from "./pages/Navbar/Layout";
import Home from "./pages/Landing_page/Home";

// general pages
import Courses from "./pages/Courses/Courses";
import News from "./pages/News/News";
import About from "./pages/About/About";

// event pages
import Events from "./pages/Events/Events";
import PastEvents from "./pages/Events/PastEvents";

// auth pages
import Login from "./pages/Login/Login";
import LogOut from "./pages/Login/logout";
import Register from "./pages/Login/Register";
import StudentProfile from "./pages/StudentProfile/StudentProfile";
import ForgotPassword from "./pages/Login/ForgotPassword";

// admin pages
import MainAdmin from "./pages/Admin_pannel/MainAdmin";
import CreatePoll from "./pages/Admin_pannel/CreatePoll";
import AdminNotification from "./pages/Admin_pannel/AdminNotification/AdminNotification";
import AddEvents from "./pages/Admin_pannel/Events/AddEvents";
import ListEvent from "./pages/Admin_pannel/Events/ListEvent";
import EditEvent from "./pages/Admin_pannel/Events/EditEvent";
import SideBar from "./pages/Admin_pannel/SideBar";
import { getReportedPosts } from "./Api/admin_reported";

// discussion arena
import PostQuestion from "./pages/Discussion_Arena/PostQuestion";
import Questions from "./pages/Discussion_Arena/Questions";
import Answer from "./pages/Discussion_Arena/Answer";

// error pages
import ErrorHandler from "./pages/Error/ErrorHandler";
import Handle404 from "./pages/Error/Handle404";
import NotLoggedIn from "./pages/Error/NotLoggedIn";

// disscussion functions
import {
  getTaggedQuestion,
  getQuestion,
  getMyQuestion,
  postQuestion,
  deleteQuestion,
  upvoteQuestion,
  reportQuestion,
} from "./Api/question_utils";

import {
  commentQuestion,
  upvoteAnswer,
  getAnswer,
  deleteAnswer,
  updateAnswer,
} from "./Api/answer_utils";

// auth functions
import { forgotPassword, verifyUser, validateRegister, handleLogin } from "./Api/login_utils";

import { fetchProfile } from "./Api/profile";
import { getEvents, editEvent, addEvent, getUpCommingEvent } from "./Api/event";

import { getRecommend, getPage, searchCourse } from "./Api/course_utils";
import Notification from "./pages/Notification/Notification";
import { getNotification } from "./Api/notification_utils";
import { changeProfileImage } from "./Api/profile";

axios.defaults.withCredentials = true;

if (process.env.VITE_VERCEL_ENV === "production")
  axios.defaults.baseURL = "https://ithub-server1.onrender.com";
else axios.defaults.baseURL = "http://localhost:5000";

console.log(process.env.VITE_VERCEL_ENV);

export const customAxios = axios.create({
  baseURL:
    process.env.VITE_VERCEL_ENV === "production"
      ? "https://server2-fastapi.onrender.com"
      : "http://localhost:8000",
  withCredentials: true,
});

// axios.defaults.baseURL = "https://ithub-server1.onrender.com";

// export const customAxios = axios.create({
//   baseURL: "https://server2-fastapi.onrender.com",
//   withCredentials: true,
// });

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorHandler />}>
      <Route index element={<Home />} />

      <Route path="/news" element={<News />} errorElement={<ErrorHandler />} />

      <Route path="/question/page/:id" loader={getQuestion} element={<Questions />} />
      <Route
        path="/question/tag/:tname/page/:id"
        loader={getTaggedQuestion}
        element={<Questions />}
      />

      <Route path="/events" loader={getEvents} element={<Events />} />
      <Route path="/events/upcomming/:id" loader={getUpCommingEvent} element={<PastEvents />} />
      {/* <Route path="/events/past/:id" loader={getPastEvent} element={<Events />} /> */}

      <Route path="/about" element={<About />} />
      <Route path="/notification" loader={getNotification} element={<Notification />} />

      {/* protected routes for login */}
      <Route element={<RequireLogin />}>
        <Route
          path="/mydiscussion/page/:id"
          loader={getMyQuestion}
          element={<Questions />}
          errorElement={<NotLoggedIn />}
        />

        <Route
          path=":id/answer/:answerId/update"
          action={updateAnswer}
          errorElement={<h1>Cannot upvote</h1>}
        />
        <Route
          path="/course"
          loader={getRecommend}
          element={<Courses />}
          errorElement={<NotLoggedIn />}
        />
        <Route path="/search" loader={searchCourse} element={<Courses />} />
        <Route path="/course/pages/:id" loader={getPage} element={<Courses />} />
        <Route path="/question/new" action={postQuestion} element={<PostQuestion />} />
        <Route
          path="/question/:id"
          loader={getAnswer}
          element={<Answer />}
          action={commentQuestion}
          errorElement={<ErrorHandler />}
        />
        <Route path="/question/:id/delete" action={deleteQuestion} />
        <Route path="/question/:id/report" action={reportQuestion} />
        <Route path="/question/:id/upvote" action={upvoteQuestion} />
        <Route path=":id/answer/:answerId/delete" action={deleteAnswer} />
        <Route path=":id/answer/:answerId/upvote" action={upvoteAnswer} />

        <Route
          path="/profile/:id"
          loader={fetchProfile}
          element={<StudentProfile />}
          errorElement={<ErrorHandler />}
        />
        <Route path="/profile" action={changeProfileImage} element={<StudentProfile />} />
      </Route>

      {/* routes for auth */}
      <Route
        path="/login"
        element={<Login />}
        action={handleLogin}
        errorElement={<ErrorHandler />}
      />
      <Route path="/verification/:id" loader={verifyUser} errorElement={<ErrorHandler />} />
      <Route path="/logout" element={<LogOut />} />
      <Route
        path="/register"
        element={<Register />}
        action={validateRegister}
        errorElement={<ErrorHandler />}
      />
      <Route
        path="/forgotpassword"
        element={<ForgotPassword />}
        action={forgotPassword}
        errorElement={<ErrorHandler />}
      />

      {/* protected routes for admin */}
      <Route element={<RequireAdmin />}>
        <Route
          // Here sidebar is the parent component who is child of navbar
          path="/admin"
          element={<SideBar />}
        >
          <Route index element={<MainAdmin />} />
          <Route path="createpoll" element={<CreatePoll />} />

          <Route
            path="editEvent"
            loader={getEvents}
            element={<ListEvent />}
            errorElement={<ErrorHandler />}
          />
          <Route
            path="editEvent/:id"
            action={editEvent}
            element={<EditEvent />}
            errorElement={<ErrorHandler />}
          />

          <Route
            path="adminnotification"
            loader={getReportedPosts}
            element={<AdminNotification />}
          />
          <Route path="addEvent" action={addEvent} element={<AddEvents />} />
        </Route>
      </Route>

      <Route path="*" element={<Handle404 />} />
    </Route>
  )
);

const App = () => {
  return (
    <ThemeContextProvider>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
};

export default App;
