import { Form, useNavigate, useNavigation, useActionData, NavLink } from "react-router-dom";
import { MdHome, MdOutlineLogin } from "react-icons/md";

const ForgotPassword = () => {
  if (useNavigation().state === "loading") return <Loader />;

  const navigate = useNavigate();
  const res = useActionData();
  // if (res && res.status === 200) {
  //     return navigate("/login", { replace: true });
  // }

  return (
    <>
      <div className="main-div">
        <h1>Forgot Password</h1>
        <Form method="post" action="/forgotpassword">
          {res && res.status === 404 && <p className="input-box"> {res.data.msg} </p>}
          {res && res.status === 200 && <p className="input-box"> {res.data.message} </p>}
          <label htmlFor="email">Email</label>
          <input type="text" placeholder="Email" name="email" id="email" autoComplete="off" />

          <button type="submit">Get Reset Email</button>
          <div className="forget-navigation">
            <NavLink to="/">
              <MdHome />
            </NavLink>
            <NavLink to="/login">
              <MdOutlineLogin />
            </NavLink>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ForgotPassword;
