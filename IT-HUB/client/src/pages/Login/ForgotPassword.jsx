import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
    NavLink
} from "react-router-dom";


const ForgotPassword = () => {

    if (useNavigation().state === "loading") return <Loader />;

    const navigate = useNavigate();
    const res = useActionData();
    // if (res && res.status === 200) {
    //     console.log(res);
    //     return navigate("/login", { replace: true });
    // }


    return (
        <>
            <div className="main-div">
                <div className="box">
                    <h1>Forgot Password</h1>
                    <Form method="post" action="/forgotpassword" >
                        {res && res.status === 404 && <p className="input-box"> {res.data.msg} </p>}
                        {res && res.status === 200 && <p className="input-box"> {res.data.message} </p>}
                        <div className='input-box'>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                placeholder='Email'
                                name="email"
                                id="email"
                                autoComplete="off"
                            />
                        </div>

                        <button style={{ border: "0.05rem solid var(--background-color)" }} type="submit">Get Reset Email</button>
                        <div className='forget-navigation'>
                            <NavLink to="/"><i className="fa-solid fa-house"></i></NavLink>
                            <NavLink to="/login"><i className="fa-solid fa-arrow-right-to-bracket"></i></NavLink>
                        </div>
                    </Form>

                </div>
            </div>
        </>
    )
}

export default ForgotPassword
