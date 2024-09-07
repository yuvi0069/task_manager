import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/user/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'email':credentials.email,
                'password':credentials.password
            },
           body:JSON.stringify({email:credentials.email})
        });
        const json = await response.json()
        console.log(json.success);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/home");

        }
        else{
            alert("Invalid credentials");
        }
    }
    const handleGoogleSignUp = async (response) => {
        window.open("http://127.0.0.1:5000/auth/google/callback","_self");
        
    };
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
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
    )
}

export default Login