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
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prev = location.state?.prev || "/";
  console.log(prev);

  const res = useActionData();
  if (res && res.status === 200) {
    setLoggedIn(true);
    return navigate(prev, { replace: true });
  }

  if (useNavigation().state === "loading") return <Loader />;

  return (
    <>
      <div className="main-div">
        <h1>Login</h1>
        <Form method="post" action="/login">
          {res && res.status === 400 && <p className="input-box"> {res.data.msg} </p>}
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" name="email" id="email" autoComplete="off" />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="off"
          />
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
