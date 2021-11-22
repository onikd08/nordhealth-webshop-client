import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const { loginWithEmailAndPassword, signInUsingGoogle, setIsLoading, setUser } = useAuth();

    const history = useHistory();
    const location = useLocation();
    const url = location.state?.from || "/home";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleGetEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleGetPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginWithEmailAndPassword = (e) => {
        e.preventDefault();

        loginWithEmailAndPassword(email, password)
            .then((res) => {
                setIsLoading(true)
                setUser(res.user);
                history.push(url)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const handleGoogleLogIn = () => {
        signInUsingGoogle()
            .then((res) => {
                setIsLoading(true)
                setUser(res.user)
                history.push(url)
            }
            )
            .catch((err) => alert(err.message))
            .finally(() => {
                setIsLoading(false)
            })
    };
    return (
        <div className="text-center my-5">
            <h1>Are you admin? Please Login!!!</h1>
            <button onClick={handleGoogleLogIn} className="btn btn-outline-primary my-1">Login With Google</button>
            <h3>OR</h3>
            <form onSubmit={handleLoginWithEmailAndPassword}>
                <input required className="mb-1" type="email" onBlur={handleGetEmail} placeholder="Email" />
                <br />
                <input required type="password" onBlur={handleGetPassword} placeholder="Password" />
                <br />
                <br />
                <input className="btn btn-outline-primary" type="submit" value="Login" />

            </form>
            <p className="mt-2"> New User ?<Link to="/register">Please register</Link ></p>
        </div>
    );
};

export default Login;