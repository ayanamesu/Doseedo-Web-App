// still debugging skeleton code
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottleMedical, faGear, faHospitalUser } from '@fortawesome/free-solid-svg-icons';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import BackButton from "../Components/BackButton";
import Cookies from 'js-cookie';
import "../App.css";

function Caregiver() {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook
    const [userId, setUserId] = useState("");
    const [AccountList, setAccountList] = useState([]);

    useEffect(() => {

         
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



//Line24 <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/221c393dfba4a2642662278dc448772db699328c927f41fa532004df96eee0b9?apiKey=fed26b027e8440e388870d08a2f64afd&" className="img" />
//this gives ERROR  mages loaded lazily and replaced with placeholders. Load events are deferred
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