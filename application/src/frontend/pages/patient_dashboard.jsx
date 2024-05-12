// still debugging skeleton code
import React, {useState} from "react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottleMedical, faGear, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import BackButton from "../Components/BackButton";
import Cookies from 'js-cookie';
import "../App.css";

function DashBoard() {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
    }, [userId]);

    const handleCalendarClick = () => {
        navigate("/calendar", { replace: true });
    };
    const handleRXListClick = () => {
        navigate("/rxlist", { replace: true });
    };

    const handleSettingsClick = () => {
        navigate("/Settings", { replace: true });  
    };
    const handleProfileClick = () => {
        navigate("/Profile", { replace: true });  
    };

    const handleEmergencyClick = () => {
        navigate("/emergencyContact", { replace: true });  

    };

    const getCurrentDate = () => {
        let today = new Date();
        let month = today.toLocaleString('default', { month: 'long' });
        let day = today.getDate();
        let year = today.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    return (
        <div className="Dashboard-Body">
            <h1 className="Dashboard-Date">{getCurrentDate()}</h1>
            <div className="Dashboard-Container">
                <div className="Dashboard-Button-row">
                    <div className="Dashboard-Button-container">
                        <FontAwesomeIcon className="Dashboard-Button" icon={faCalendar} title="Calendar" onClick={handleCalendarClick} />
                        <p className="Dashboard-Button-text">Calendar</p>
                    </div>
                    <div className="Dashboard-Button-container">
                        <FontAwesomeIcon className="Dashboard-Button" icon={faPrescriptionBottleMedical} title="Rx List" onClick={handleRXListClick} />
                        <p className="Dashboard-Button-text">Rx List</p>
                    </div>
                    <div className="Dashboard-Button-container">
                        <FontAwesomeIcon className="Dashboard-Button" icon={faUser} title="Profile" onClick={handleProfileClick} />
                        <p className="Dashboard-Button-text">Profile</p>
                    </div>
                </div>
                <div className="Dashboard-Button-row">
                    <div className="Dashboard-Button-container">
                        <FontAwesomeIcon className="Dashboard-Button" icon={faCircleExclamation} title="911" onClick={handleEmergencyClick} />
                        <p className="Dashboard-Button-text">Emergency contact</p>
                    </div>
                    <div className="Dashboard-Button-container">
                        <FontAwesomeIcon className="Dashboard-Button" icon={faGear} title="Settings" onClick={handleSettingsClick} />
                        <p className="Dashboard-Button-text">Settings</p>
                    </div>
                </div>
            </div>
            <BackButton />
        </div>
    );
}

export default DashBoard;