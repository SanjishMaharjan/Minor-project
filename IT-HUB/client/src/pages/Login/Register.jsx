import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
} from "react-router-dom";
import Loader from "../../components/Loader";


const Register = () => {

    if (useNavigation().state === "loading") return <Loader />;

    const navigate = useNavigate();
    const res = useActionData();
    if (res && res.status === 200) {
        return navigate("/", { replace: true });
    }
    console.log(res);

    return (
        <>
            <div className="main-div">
                <div className="box">
                    <h1>Sign up</h1>
                    <Form method="post" action="/register">
                        <div className="input-box">
                            {res && res.status === 400 && <p className="input-box"> {res.data.msg} </p>}
                            <label htmlFor="email">Email</label>
                            <input type="text" placeholder="Email" name="email" id="email" autoComplete="off" />
                        </div>
                        <div className="input-box">
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder="Name" name="name" id="name" autoComplete="off" />
                        </div>
                        <div className="input-box">
                            <label htmlFor="DOB">DOB</label>
                            <input type="date" placeholder="Date of Birth" name="DOB" id="DOB" autoComplete="off" />
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
                        <div className="input-box">
                            <select name="level" id="level">
                                <option value="First Semester">First Semester</option>
                                <option value="Second Semester">Second Semester</option>
                                <option value="Third Semester">Third Semester</option>
                                <option value="Fourth Semester">Fourth Semester</option>
                                <option value="Fifth Semester">Fifth Semester</option>
                                <option selected value="Sixth Semester">Sixth Semester</option>
                                <option value="Seventh Semester">Seventh Semester</option>
                                <option value="Eighth Semester">Eighth Semester</option>
                            </select>
                        </div>

                        <button className="signup-button" type="submit">Sign Up</button>
                    </Form>
                </div>
            </div>
        </>
    )
}



export default Register
