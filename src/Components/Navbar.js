import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import  logo  from "../img/graphic6.png";
import '../App.css';

export const Navbar = () => {
    let location = useLocation();
    let history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        history("/login",{ replace: true });
    }

    return (
        <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand"to="/"><img className='logo' src={logo} alt="logo"/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/all" ? "active" : ""}`} to="/all">All</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form> : <button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}
