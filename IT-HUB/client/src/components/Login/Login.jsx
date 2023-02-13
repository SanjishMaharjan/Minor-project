import axios from "axios";
import { NavLink, Form, redirect, Navigate, useNavigation } from "react-router-dom";
import "./LoginStyles.css";
import { context } from "../../Context";
import { useContext } from "react";
import HashLoader from "react-spinners/HashLoader";

const Login = () => {
  const navigate = useNavigation();
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return (
      <>
        <div className="loader">
          <HashLoader color="#36d7b7" />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="main-div">
        <div className="box">
          <h1>Login</h1>
          <Form method="post" action="/login/submit">
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email" name="email" id="email" autoComplete="off" />
            </div>

            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                autoComplete="off"
              />
            </div>
            <button type="submit">Login</button>
            <NavLink to="/forgotpassword">
              <a className="btn-register">Forgot Password?</a>
            </NavLink>
            <NavLink to="/register">
              <a className="btn-register">Don't have a account? Register here</a>
            </NavLink>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;

export const handleLogin = async ({ request }) => {
  // const { setLoggedIn } = useContext(context);
  const formdata = await request.formData();
  const data = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };
  const response = await axios.post("http://localhost:5000/api/users/login", data);
  if (!response.status === 200) return redirect("/login");

  // setLoggedIn(true);

  return redirect("/");
};
