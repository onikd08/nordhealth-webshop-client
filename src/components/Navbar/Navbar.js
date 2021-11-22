import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logOut();
        history.push('/home');

    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="text-decoration-none me-3 fs-3 fw-bold" to="/home">WebShop</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="text-decoration-none me-3" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="text-decoration-none me-3" to="/review">Order Review</NavLink>
                            </li>
                            {
                                user?.displayName &&
                                <li className="nav-item">
                                    <NavLink className="text-decoration-none me-3" to="/addProduct">Add Product</NavLink>
                                </li>
                            }



                        </ul>
                        <div className="d-flex">
                            <div className="my-auto me-2">
                                <small className="fw-bold fs-5 text-primary">{user?.displayName}</small>
                            </div>

                            {
                                !user.displayName ?
                                    <p className="m-auto">
                                        <NavLink className="text-decoration-none me-3" to="/login">Login</NavLink>
                                    </p>
                                    :
                                    <button onClick={handleLogout} className="btn btn-danger me-1">Logout</button>
                            }



                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;