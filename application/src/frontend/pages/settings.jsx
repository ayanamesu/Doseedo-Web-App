import React from "react";
import { useNavigate } from 'react-router-dom';
 
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../App.css";
const  SettingsPage = () => {
    const navigate = useNavigate();
 
const [RedirectToHome, setRedirectToHome] = React.useState(false);
/*
  React.useEffect(() => {
    axios.get('http://localhost:8000/api/session')//session id and user id
    .then((apiRes) => {
        const sessionData = apiRes.data; // Assuming the session data is in apiRes.data
    
        if (checkSession(sessionData)) { //true then do nothing
            // Session is active, do nothing
        } else {
            return <Navigate to="/" replace={true} />;//false redirerct to welcome page (login page)
        }
      console.log(apiRes);
    })
    .catch((error) => {
      console.error(error);
    });
    const checkSession = (sessionData) => {//check the session id that browser have is on server (if user log off already session id should be removed)
        const cookies = document.cookie.split(';').map(cookie => cookie.trim()); // Split cookies into an array
        for (const cookie of cookies) {
            const [name, value] = cookie.split('=');
            if (name.trim() === 'sessionid' && value.trim() === sessionData.sessionid) {//check if apiRes.sessionid==cookie.session sessionId
                return true; // Session is active
            }
        }
        return false; // Session is not active
    }

}, []);
*/
const handleHomeClick = () => {
    console.log("clicked");
    navigate("/", { replace: true });
};
    const handleContactsClick = () => {
           // return <Navigate to="/Contacts" replace={true} />;
    };

    const handleNotificationsClick = () => {
         // return <Navigate to="/Notifications" replace={true} />;
    };
    const handleAboutUsClick = () => {
        navigate("/about", { replace: true });
 
    };

   
    const handleSignOutClick = () => {
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

//
    const handleGeneralClick = () => {
         // return <Navigate to="/General" replace={true} />;
    };

    const handleAccountSettingsClick = () => {
       // return <Navigate to="/AccountSettings" replace={true} />;
    };

    const handleAccessibilityClick = () => {
      // return <Navigate to="/Accessibility" replace={true} />;
    };

    const handleLanguageClick = () => {
       // return <Navigate to="/Language" replace={true} />;
    };

    const handleBackClick = () => {
        window.history.go(-1);
    };
    if (RedirectToHome) {
        return    navigate("/", { replace: true });
      }
    return (
        <>
            <div className="div">
            <div className="div-2">
                    <div className="div-3"><button className="div-5" onClick={handleHomeClick}>Doseedo</button></div>
                    <div className="div-4">
                        <button className="div-5" onClick={handleContactsClick}>Contacts</button>
                        <button className="div-6" onClick={handleNotificationsClick}>Notifications</button>
                        <button className="div-7" onClick={handleAboutUsClick}>About Us</button>
                        <button className="div-8" onClick={ handleSignOutClick}>Sign Out</button>
                    </div>
                </div>
                <div className="div-9">
                    <div className="div-10">
                        <div className="column">
                            <div className="div-11">
                                <button className="div-12" onClick={handleGeneralClick}>
                                    General{" "}
                                </button>
                                <button className="div-13" onClick={handleAccountSettingsClick}>
                                    Account Settings
                                </button>
                                <button className="div-14" onClick={handleAccessibilityClick}>
                                    Accessibility{" "}
                                </button>
                                <button className="div-15" onClick={handleLanguageClick}>
                                    Language
                                </button>
                            </div>
                        </div>
                        <div className="column-2">
                            <div className="div-16">
                                <div className="div-17">
                                    <div className="div-18">Settings</div>
                                    <div className="div-19" />
                                </div>
                                <div className="div-20">
                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e31d2be7c77610d6400102080925ce4e35aacd83d0fdd1f225d703c78a19475?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img" />
                                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/018433aa7d732e186206fdb2a934e2148ae8bd84632a8e23ec9029e84b1a76d0?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img-2" />
                                    <button className="div-21" onClick={handleBackClick}>
                                        Back{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SettingsPage;