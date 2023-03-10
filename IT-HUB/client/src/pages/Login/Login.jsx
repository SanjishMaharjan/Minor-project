import {
  useLocation,
  Form,
  useNavigate,
  useNavigation,
  NavLink,
  useActionData,
  Navigate,
} from "react-router-dom";
import "./LoginStyles.scss";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prev = location.state?.prev || "/";

  const res = useActionData();
  if (res && res.status === 200) {
    login(res);

    return <Navigate to={"/"} />;
  }

  const serverError = res?.status === 400 && res?.data?.msg;
  const emailError = res?.status === 403 && res?.data?.errors?.email;
  const passwordError = res?.status === 403 && res?.data?.errors?.password;

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="main-div">
        <h1>Login</h1>
        <Form
          method="post"
          action="/login"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
              e.preventDefault();
            }
          }}
        >
          <p className="input-box"> {serverError ?? null} </p>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            autoComplete="off"
            className={emailError ? "error" : ""}
          />
          <p className="input-box"> {emailError ?? null} </p>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="off"
            className={passwordError ? "error" : ""}
          />
          <p className="input-box">{passwordError ?? null}</p>
          <button type="submit">Login</button>
          <NavLink to="/forgotpassword">Forgot Password?</NavLink>
          <NavLink to="/register">Don't have a account? Register here</NavLink>
        </Form>
      </div>
    </>
  );
};
export default Login;
