import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        if (password === cpassword) {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Save the auth token and redirect
                localStorage.setItem("token", json.authToken);
                history("/");
                props.showAlert("Account created successfully", "success");
            } else {
                props.showAlert("Invalid Details", "danger");
            }
        }
        else {
            props.showAlert("Invalid Details", "danger");
        }

    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className="mb-5">
            <h2 className="text-center my-3">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={onChange}
                        id="name"
                        name="name"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={onChange}
                        name="password"
                        id="password"
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={onChange}
                        name="cpassword"
                        id="cpassword"
                        minLength={5}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg my-3">
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
