import { Form, useNavigate, useNavigation, useActionData, Navigate } from "react-router-dom";
import Loader from "../../components/Loader";

const Register = () => {
  if (useNavigation().state === "submitting") return <Loader />;

  const navigate = useNavigate();
  const res = useActionData();
  if (res && res.status === 200) {
    return <Navigate to="/login" />;
  }

  const serverError = res?.status === 400 && res?.data?.msg;
  const emailError = res?.status === 403 && res?.data?.errors?.email;
  const passwordError = res?.status === 403 && res?.data?.errors?.password;
  const nameError = res?.status === 403 && res?.data?.errors?.name;
  const DOBError = res?.status === 403 && res?.data?.errors?.DOB;
  const levelError = res?.status === 403 && res?.data?.errors?.level;

  return (
    <>
      <div className="main-div">
        <h1>Sign up</h1>
        <Form
          method="post"
          action="/register"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
              e.preventDefault();
            }
          }}
        >
          {<p className="input-box"> {serverError ?? null} </p>}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            autoComplete="off"
            className={emailError ? "error" : ""}
          />
          {<p className="input-box"> {emailError ?? null} </p>}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            autoComplete="off"
            className={nameError ? "error" : ""}
          />
          {<p className="input-box"> {nameError ?? null} </p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            autoComplete="off"
            className={passwordError ? "error" : ""}
          />
          {<p className="input-box">{passwordError ?? null}</p>}
          <select name="level" id="level">
            <option value="First Semester">First Semester</option>
            <option value="Second Semester">Second Semester</option>
            <option value="Third Semester">Third Semester</option>
            <option value="Fourth Semester">Fourth Semester</option>
            <option value="Fifth Semester">Fifth Semester</option>
            <option value="Sixth Semester">Sixth Semester</option>
            <option value="Seventh Semester">Seventh Semester</option>
            <option value="Eighth Semester">Eighth Semester</option>
          </select>
          {<p className="input-box">{levelError ?? null}</p>}

          <button type="submit">Sign Up</button>
        </Form>
      </div>
    </>
  );
};

export default Register;
