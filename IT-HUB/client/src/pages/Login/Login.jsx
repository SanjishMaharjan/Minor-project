import { Form, useNavigate, useNavigation, NavLink } from "react-router-dom";
import { useContext } from "react";
import "./LoginStyles.css";
import { context } from "../../context/Context";
import Loader from "../../components/Loader";
import { validateLogin } from "../../Api/login_utils";

const Login = () => {
  const { setLoggedIn } = useContext(context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const data = {
      email: formdata.get("email"),
      password: formdata.get("password"),
    };

    try {
      await validateLogin(data);
      setLoggedIn(true);
      navigate("/");
    } catch {
      navigate("/login");
    }
  };

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="main-div">
        <div className="box">
          <h1>Login</h1>
          <Form method="post" onSubmit={handleLogin}>
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
