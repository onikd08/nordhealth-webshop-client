import React, { useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const Register = () => {


    const { signInUsingGoogle, createAccountWithEmail, setUser, setIsLoading, updateName } = useAuth();

    const history = useHistory();
    const location = useLocation();
    const url = location.state?.from || "/home";

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleGetName = (e) => {
        console.log(e.target.value);
        setName(e.target.value)
    }

    const handleGetEmail = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value)
    }

    const handleGetPassword = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value)
    }



    const handleRegistration = (e) => {
        e.preventDefault();
        createAccountWithEmail(email, password)
            .then((res) => {
                setIsLoading(true)
                updateName(name)
                setUser(res.user)
                history.push(url)
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



    const handleGoogleLogin = () => {
        signInUsingGoogle()
            .then((res) => {
                setIsLoading(true)
                setUser(res.user)
                history.push(url)
            }
            )
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false)
            })
    };


    return (
        <div className="text-center mt-4">
            <h3>Register Yourself</h3>
            <form onSubmit={handleRegistration}>
                <input className="mb-1" type="text" onBlur={handleGetName} placeholder="name" />
                <br />
                <input className="mb-1" type="email" onBlur={handleGetEmail} placeholder="email" />
                <br />
                <input className="mb-1" type="password" onBlur={handleGetPassword} placeholder="password" />
                <br />
                <input className="btn btn-primary mt-2" type="submit" placeholder="create" />
                <br />
            </form>
            <h2 className="my-2">OR</h2>
            <button className="btn btn-primary" onClick={handleGoogleLogin}>Google Sign In</button>
            <p className="mt-2"> Already Signed Up? <Link to="/login">Please Login</Link ></p>
        </div>
    );
};

export default Register;