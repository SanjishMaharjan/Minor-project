import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import { ContextProvider } from "./Context";

import "./App.css";

import Courses from "./components/Courses/Courses";
import Gallery from "./components/Gallery/Gallery";
import Home from "./components/Landing_page/Home";
import News from "./components/News/News";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import About from "./components/About/About";
import StudentProfile from "./components/StudentProfile/StudentProfile";
import ForgotPassword from "./components/Login/ForgotPassword";
import Checklogin from "./components/Login/Checklogin";
import Layout from "./components/Navbar/Layout";
import PostQuestion from "./components/QA/PostQuestion";
import Questions from "./components/QA/Questions";
import Answer from "./components/QA/Answer";
import ErrorHandler from "./components/Error/ErrorHandler";

import { getQuestion } from "./components/QA/Questions";
import { fetchNews } from "./components/News/News";
import { getAnswer } from "./components/QA/Answer";
import { postQuestion } from "./components/QA/PostQuestion";
import { deleteQuestion } from "./components/QA/Questions";
import { logOut } from "./components/Login/logout";
import { handleLogin } from "./components/Login/Login";

axios.defaults.withCredentials = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/news" element={<News />} loader={fetchNews} />

      <Route path="/question" element={<Questions />} loader={getQuestion} />
      <Route
        path="/question/new"
        element={<PostQuestion />}
        action={postQuestion}
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

      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/submit" action={handleLogin} />
      <Route path="/logout" loader={logOut} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/checklogin" element={<Checklogin />} />

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
