import React from 'react';
import { useNavigate } from 'react-router-dom';
import Notes from "./Notes";

export default function Home() {
    let navigate = useNavigate();

    
    const handleToken = () => {
   
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            console.log('Token found:', token);
           
            localStorage.setItem('token', token);
            
          
            navigate('/home', { replace: true });
        } else if (!localStorage.getItem('token')) {
            console.log('No token found, redirecting to sign-in');
            
            navigate('/');
        }
    };

   
    handleToken();

    return (
        <div className="container-mod-3">
            <h1>Your Notes</h1>
            <Notes />
        </div>
    );
}
