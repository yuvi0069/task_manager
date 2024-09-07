import React from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from "./Notes";

export default function Home() {
    let navigate = useNavigate();

    // Function to handle token extraction and storage
    const handleToken = () => {
        // Extract token from URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            console.log('Token found:', token);
            // Store token in localStorage
            localStorage.setItem('token', token);
            
            // Clear the token from the URL by navigating to the same path without query params
            navigate('/home', { replace: true });
        } else if (!localStorage.getItem('token')) {
            console.log('No token found, redirecting to sign-in');
            // Redirect to sign-in if no token found
            navigate('/signin');
        }
    };

    // Handle token immediately when the component is rendered
    handleToken();

    return (
        <div className="container-mod-3">
            <h1>Your Notes</h1>
            <Notes />
        </div>
    );
}
