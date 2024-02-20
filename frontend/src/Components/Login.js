import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Animation from './Shared/Animation';
import handelDataFetch from '../Controller/handelDataFetch';


function Login() {
    document.title = "Login";

    const { setLoginLogout, setCartLength } = useContext(UserContext);

    const [loginStatus, setLoginStatus] = useState({
        status: "",
        message: ""
    });

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [showAnimation, setShowAnimation] = useState(false);

    const navigate = useNavigate();

    // fetch the login and add the cart data into the app use state 

    // const handleCartLength = async () => {
    //     try {
    //         const res = await fetch('/cart/get', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //             },
    //             credentials: "include"
    //         });
    //         const result = await res.json();

    //         if (result.status) {
    //             setCartLength({ type: "CART", length: result.cartLength });
    //         } else {
    //             setCartLength({ type: "CART", length: null });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    const handleVerification = async () => {
        try {
            const result = await handelDataFetch({path: "/api/v2/auth", method: "POST"}, setShowAnimation);

            if (result.status) {
                navigate('/profile')
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleVerification();
    }, []);

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const handleUserLogin = async (e) => {
        try {
            setLoginStatus({ status: "", message: "" });
            e.preventDefault(e);

            const result = await handelDataFetch({path: "/api/v2/auth/sign-in", method: "POST", body: user}, setShowAnimation);

            if (result.status) {
                setLoginLogout({ type: "USER", payload: true });
                setLoginStatus({ status: true, message: result.message })
                setTimeout(() => {
                    navigate('/profile');
                }, 1000);
                // handleCartLength();
            } else {
                setLoginLogout({ type: "USER", payload: false });
                setLoginStatus({ status: false, message: result.message });
                setUser({ ...user, password: "" });
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center py-2 px-2'>
                <div className='col-12 col-md-8 col-lg-6 col-xl-4 shadow border rounded px-2 py-2 p-md-5'>
                    <div className="d-flex flex-column flex-md-row justify-content-center">
                        <div className='col-12 col-md-6 text-center p-0 mb-2 mb-md-0 me-md-2 bg-primary rounded'>
                            <Link to={"/login"} className='btn text-light w-100'>Login</Link>
                        </div>
                        <div className='col-12 col-md-6 text-center p-0 ms-md-2 bg-secondary rounded'>
                            <Link to={"/signup"} className='btn text-light w-100'>Signup</Link>
                        </div>
                    </div>
                    <div className="row p-3">
                        <p className="text-center m-0 ">Connect With Social Account: </p>
                    </div>
                    <div className="row p-3">
                        <p className="text-center login-social-link m-0">
                            <i className="fab fa-facebook-f ms-4 cursor-pointer"></i>
                            <i className="fab fa-google ms-4"></i>
                            <i className="fab fa-twitter ms-4"></i>
                            <i className="fab fa-github ms-4"></i>
                        </p>
                    </div>
                    <div className="row">
                        <p className="text-center">Or:</p>
                    </div>
                    {typeof (loginStatus.status) === "boolean" &&
                        <div className="row p-3">
                            <p className={`text-center ${loginStatus.status === true ? 'text-success' : 'text-danger'} m-0`}>{`${loginStatus.status === true ? 'Login Successful' : 'Invalid User'}`}</p>
                        </div>
                    }
                    <div className="d-flex justify-content-center">
                        <div className="col-12">
                            <input type="email" onChange={handleInputs} className='form-control mb-3' name="email" id="email" placeholder='Enter Email' />
                            <input type="password" onChange={handleInputs} className='form-control mb-2' name="password" id="password" placeholder='Enter Password' value={user.password === "" ? "" : user.password} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-end p-2">
                        <p className="m-0">
                            <Link to={"/user/forgot-password"}>Forgot Password?</Link>
                        </p>
                    </div>
                    <div className="justify-content-center mt-2">
                        <div className="col-12">
                            <button onClick={handleUserLogin} className='btn btn-primary w-100' type="submit">Login</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                showAnimation && <Animation />
            }
        </>

    )
}

export default Login