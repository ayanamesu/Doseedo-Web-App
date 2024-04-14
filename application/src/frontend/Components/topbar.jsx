import React from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import UseSessionCheck from './UseSessionCheck';
import axios from 'axios';

function Topbar() {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook
    const [isSessionActive] = UseSessionCheck();
    const session_id = document.cookie.split("=")[1];
    let data = {
        session_id : session_id
    }
    const handleHomeClick = () => {
        navigate("/dashboard", { replace: true }); // Programmatically navigate to "/"
    };

    const NavigateToContacts = () => {
        navigate("/Contacts", { replace: true }); // Programmatically navigate to "/Contacts"
    };
    
    const NavigateToNotifications = () => {
        navigate("/Notifications", { replace: true }); // Programmatically navigate to "/Notifications"
    };
    
    const NavigateToAbout = () => {
        navigate("/about", { replace: true }); // Programmatically navigate to "/about"
    };

    const NavigateToSignOut = () => {
             
        // Handle sign out
       
        axios.post('http://localhost:8000/api/logout',data)//userData contains session id 
        .then((response) => {
            console.log("response Status"+response.status);
            if (response.status == 200) {
                document.cookie = "session_id=; expires=Thu, 01 Jan 1942 00:00:00 UTC; path=/;";
                alert("User logged out");
                navigate('/');
            }
        })
        .catch((error) => {
            console.error(error);
        });
        
    }; 

 
    
    

    if(window.location.pathname !== "/"){
        return (
            <div className="div-2">
                <div className="div-3">
                    <button className="div-5" onClick={handleHomeClick}>Doseedo</button>
                </div>
                <div className="div-4">
                    <button className="div-5" onClick={NavigateToContacts}>Contacts</button>
                    <button className="div-6" onClick={NavigateToNotifications}>Notifications</button>
                    <button className="div-7" onClick={NavigateToAbout}>About Us</button>
                    <button className="div-8" onClick={NavigateToSignOut}>Sign Out</button>
                </div>
            </div>
        );
    }
}

export default Topbar;
