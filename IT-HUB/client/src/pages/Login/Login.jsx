import {
  useLocation,
  Form,
  useNavigate,
  useNavigation,
  NavLink,
  useActionData,
} from "react-router-dom";
import "./LoginStyles.scss";
import Loader from "../../components/Loader";
import useAuth from "../../context/AuthContext";

const Login = () => {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prev = location.state?.prev || "/";

  const res = useActionData();
  if (res && res.status === 200) {
    setLoggedIn(true);
    return navigate(prev, { replace: true });
  }

  const serverError = res?.status === 400 && res?.data?.msg;
  const emailError = res?.status === 403 && res?.data?.errors?.email;
  const passwordError = res?.status === 403 && res?.data?.errors?.password;

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="main-div">
        <h1>Login</h1>
        <Form method="post" action="/login">
          <p className="input-box"> {serverError ?? null} </p>

          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" name="email" id="email" autoComplete="off" />
          <p className="input-box"> {emailError ?? null} </p>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="off"
          />
          <p className="input-box">{passwordError ?? null}</p>
          <button type="submit">Login</button>
          <NavLink to="/forgotpassword">
            <a>Forgot Password?</a>
          </NavLink>
          <NavLink to="/register">
            <a>Don't have a account? Register here</a>
          </NavLink>
        </Form>
      </div>
    </>
  );
};
export default Login;
