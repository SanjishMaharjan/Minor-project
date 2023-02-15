import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RequireLogin from "./components/RequireLogin";
import RequireAdmin from "./components/RequireAdmin";

import { ContextProvider } from "./context/Context";

import "./App.css";

import Layout from "./pages/Navbar/Layout";

import Courses from "./pages/Courses/Courses";
import Gallery from "./pages/Gallery/Gallery";
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
import EditContent from "./pages/Admin_pannel/EditContent";
import Notification from "./pages/Admin_pannel/Notification";

import PostQuestion from "./pages/Discussion_Arena/PostQuestion";
import Questions from "./pages/Discussion_Arena/Questions";
import Answer from "./pages/Discussion_Arena/Answer";

import ErrorHandler from "./pages/Error/ErrorHandler";
import Handle404 from "./pages/Error/Handle404";

import { getQuestion } from "./Api/discussion_utils";
import { fetchNews } from "./Api/news_utils";
import { getAnswer } from "./Api/discussion_utils";
import { postQuestion } from "./Api/discussion_utils";
import { deleteQuestion } from "./Api/discussion_utils";
import { commentQuestion } from "./Api/discussion_utils";
import { validateLogin } from "./Api/login_utils";
import { validateRegister } from "./Api/login_utils";
import { forgotPassword } from "./Api/login_utils";
import ManageEvents from "./pages/Admin_pannel/ManageEvents";
import SideBar from "./pages/Admin_pannel/SideBar";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/news" loader={fetchNews} element={<News />} errorElement={<ErrorHandler />} />

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
          errorElement={<ErrorHandler />}
        />
        <Route
          path="/question/:id/delete"
          action={deleteQuestion}
          errorElement={<h1>Cannot delete</h1>}
        />
        <Route
          path="/:questionId/comment/new"
          action={commentQuestion}
          errorElement={<ErrorHandler />}
        />
      </Route>

      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />

      <Route
        path="/login"
        element={<Login />}
        action={validateLogin}
        errorElement={<ErrorHandler />}
      />
      <Route path="/logout" element={<LogOut />} />
      <Route
        path="/register" element={<Register />}
        action={validateRegister}
        errorElement={<ErrorHandler />}
      />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/profile/:id" element={<StudentProfile />} />
      <Route path="/forgotpassword" element={<ForgotPassword />}
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
          <Route path="editcontent" element={<EditContent />} />
          <Route path="notification" element={<Notification />} />
          <Route path="manageevents" element={<ManageEvents />} />
        </Route>
      </Route>

      <Route path="*" element={<Handle404 />} />
    </Route>
  )
);

const App = () => {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
};

export default App;
