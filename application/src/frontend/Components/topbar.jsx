import React from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import UseSessionCheck from './UseSessionCheck';
 
function Topbar() {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook
    const [isSessionActive] = UseSessionCheck();
    const handleHomeClick = () => {
        navigate("/home", { replace: true }); // Programmatically navigate to "/"
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
             /*
        // Handle sign out
        const sessionData = { sessionid: document.cookie.sessionid };
        axios.post('http://localhost:8000/api/logout',sessionData)//userData contains session id 
        .then((response) => {
            console.log(response.data); // Assuming the response contains user data
            // Update the state or perform any other necessary actions after sign out
            setRedirectToHome(true); // Set state to redirect
        })
        .catch((error) => {
            console.error(error);
            // Handle errors if needed
        });
        */
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
