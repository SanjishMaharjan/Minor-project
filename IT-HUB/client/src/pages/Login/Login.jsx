import {
  useLocation,
  Form,
  useNavigate,
  useNavigation,
  NavLink,
  useActionData,
} from "react-router-dom";
import "./LoginStyles.css";
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
      {res && res.status === 400 && <h1> {res.data.msg} </h1>}
      <div className="main-div">
        <div className="box">
          <h1>Login</h1>
          <Form method="post" action="/login">
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
            <button style={{ border: "0.05rem solid var(--background-color)" }} type="submit">
              Login
            </button>
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
