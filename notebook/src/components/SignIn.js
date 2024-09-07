import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const SignIn = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/user/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json1 = await response.json();
        if (json1.success) {
            localStorage.setItem('token', json1.authtoken);
            navigate("/home");
        } else {
            alert("User already exists");
        }
    };

    const handleGoogleSignUp = async (response) => {
        window.open("https://task-manager-6ttv.onrender.com/auth/google/callback","_self");
        
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={credentials.name}
                        onChange={onChange}
                        id="name"
                        name="name"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        value={credentials.email}
                        onChange={onChange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={credentials.password}
                        onChange={onChange}
                        name="password"
                        id="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-3">
                <GoogleLogin 
                    onSuccess={handleGoogleSignUp}
                    onError={(error) => alert("Google sign-up error: " + error.message)}
                />
            </div>
        </div>
    );
};

export default SignIn;
