import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

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

import PostQuestion from "./pages/Discussion_Arena/PostQuestion";
import Questions from "./pages/Discussion_Arena/Questions";
import Answer from "./pages/Discussion_Arena/Answer";

import ErrorHandler from "./pages/Error/ErrorHandler";

import { getQuestion } from "./Api/discussion_utils";
import { fetchNews } from "./Api/news_utils";
import { getAnswer } from "./Api/discussion_utils";
import { postQuestion } from "./Api/discussion_utils";
import { deleteQuestion } from "./Api/discussion_utils";
import { commentQuestion } from "./Api/discussion_utils";

axios.defaults.withCredentials = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/news" loader={fetchNews} element={<News />} errorElement={<ErrorHandler />} />

      <Route path="/question" loader={getQuestion} element={<Questions />} />
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

      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<LogOut />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/profile/:id" element={<StudentProfile />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="*" element={<h1>Not found</h1>} />
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
