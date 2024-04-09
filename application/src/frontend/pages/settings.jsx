import React from "react";
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import "../App.css";
const SettingsPage = () => {
    const [LoggedInUser, setLoginUser] =  useState([]);
    const [isSessionActive, setSession] =  useState(false);
    const [RedirectToHome, setRedirectToHome] = React.useState(false);
  React.useEffect(() => {
    /*
    axios.get('http://localhost:8000/api/settings')
    .then((res) => res.json())
    .then((apiRes) => {
      console.log(apiRes);
      
      setProducts(apiRes.data);
    })
    .catch((error) => {
      console.error(error);
    });
      axios.get('http://localhost:8000/api/session')
    .then((res) => res.json())
    .then((apiRes) => {
      console.log(apiRes);
      
      setProducts(apiRes.data);
    })
    .catch((error) => {
      console.error(error);
    });
*/

}, []);
    //fetchData
//bar
    const handleContactsClick = () => {
           // return <Navigate to="/Contacts" replace={true} />;
    };

    const handleNotificationsClick = () => {
         // return <Navigate to="/Notifications" replace={true} />;
    };
    const handleAboutUsClick = () => {
      return <Navigate to="/about" replace={true} />;

    };

   
    const handleSignOutClick = () => {
        // Handle sign out
        axios.get('http://localhost:8000/api/logout')
        .then((res) => res.json())
        .then((user) => {
          console.log(user);
          // Update the products state with the fetched data
          setSession(false);
        })
        .catch((error) => {
          console.error(error);
        });
        setRedirectToHome(true);
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
        // Handle back click
    };
    if (RedirectToHome) {
        return <Navigate to="/" replace={true} />;
      }
    return (
        <>
            <div className="div">
                <div className="div-2">
                    <div className="div-3">Doseedo</div>
                    <div className="div-4">
                        <button className="div-5" onClick={handleContactsClick}>
                            Contacts
                        </button>
                        <button className="div-6" onClick={handleNotificationsClick}>
                            Notifications
                        </button>
                        <button className="div-7" onClick={handleAboutUsClick}>
                            About Us
                        </button>
                        <button className="div-8" onClick={handleSignOutClick}>
                            Sign Out
                        </button>
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