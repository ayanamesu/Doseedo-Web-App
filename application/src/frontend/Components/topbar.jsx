import React from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import axios from 'axios';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faCircleInfo, faBell, faAddressBook } from '@fortawesome/free-solid-svg-icons';

function Topbar({ apiLink }) {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook
    // const [isSessionActive] = UseSessionCheck();
    const session_id = Cookies.get('session_id');
    let data = {
        session_id : session_id
    }
    const handleHomeClick = () => {
        if(window.location.pathname !== '/'){
            if(Cookies.get('accountType')==='patient'){
                navigate("/patient_dashboard", { replace: true }); // Programmatically navigate to "/"
            }else if(window.location.pathname === '/about' && !session_id){
                navigate("/");
            }
            else{
                navigate("/caregiver_dashboard", { replace: true }); // Programmatically navigate to "/"
            }
        }
    };

    // const NavigateToContacts = () => {
    //     navigate("/Contacts", { replace: true }); // Programmatically navigate to "/Contacts"
    // };
    
    const NavigateToNotifications = () => {
        navigate("/reminders", { replace: true }); // Programmatically navigate to "/Notifications"
    };
    
    const NavigateToAbout = () => {
        navigate("/about", { replace: true }); // Programmatically navigate to "/about"
    };

    const NavigateToSignOut = () => {
             
        // Handle sign out
       
        axios.post(apiLink + '/logout', data)//userData contains session id 
        .then((response) => {
            console.log("response Status"+response.status);
            if (response.status == 200) {
                // document.cookie = "session_id=; expires=Thu, 01 Jan 1942 00:00:00 UTC; path=/;";
                Cookies.remove("session_id");
                Cookies.remove("user_id");
                Cookies.remove("accountType");
                // Cookies.remove("connect.sid");
                alert("Sucessfully logged out!");
                navigate('/');
            }
        })
        .catch((error) => {
            console.error(error);
        });
        
    }; 
    const renderNavBarButtons = () => {
        return window.location.pathname !== '/' && session_id ? (
            <>
                <button className="topbar-button" onClick={NavigateToNotifications}><FontAwesomeIcon icon={faBell}/> Notifications</button>
                <button className="topbar-button" onClick={NavigateToAbout}><FontAwesomeIcon icon={faCircleInfo} /> About Us</button>
                <button className="topbar-button" onClick={NavigateToSignOut}><FontAwesomeIcon icon={faRightFromBracket} /> Sign Out</button>
            </>
        ) : (
            <>
                <button className="topbar-button" onClick={NavigateToAbout}><FontAwesomeIcon icon={faCircleInfo} /> About Us</button>
            </>
        );
    }

        return (
            <div className="topbar">
                <h1 className="site-logo" onClick={handleHomeClick}>Doseedo</h1>
                <div className="topbar-buttons">
                    {/* <button className="topbar-button" onClick={NavigateToContacts}><FontAwesomeIcon icon={faAddressBook}/> Contacts</button> */}
                    {renderNavBarButtons()}
                </div>
            </div>
        );
    }


export default Topbar;
