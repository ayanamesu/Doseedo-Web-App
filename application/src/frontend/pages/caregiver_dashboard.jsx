import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottleMedical, faGear, faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import BackButton from "../Components/BackButton";
import Cookies from 'js-cookie';
import "../App.css";

function Caregiver() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
            console.log("User id has been set!" + userId);
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
    }, [userId]);

    const handleCalendarClick = () => {
        navigate("/calendar", { replace: true });
    };

    const handleRXListClick = () => {
        navigate("/caregiverRxList", { replace: true });
    };

    const handleSettingsClick = () => {
        navigate("/Settings", { replace: true });  
    };

    const handleProfileClick = () => {
        navigate("/Profile", { replace: true });  
    };

    const handlePatientsClick = () => {
        navigate("/patientList", { replace: true });  
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
                        <FontAwesomeIcon className="Dashboard-Button" icon={faHospitalUser} title="Patients" onClick={handlePatientsClick} />
                        <p className="Dashboard-Button-text">Patients</p>
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

export default Caregiver;