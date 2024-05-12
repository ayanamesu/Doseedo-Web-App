import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';


const Reminders = ({apiLink}) => {
    const navigate = useNavigate();
    const [user_id, setUserId] = useState("");
    const [alert_id,setAlert_id]=useState("");
    const [alertData, setAlertData] = useState([]);

    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
        
        axios.post(apiLink + '/pullAlerts', {user_id: user_id})
        .then(response => {
            console.log("Alert successfuly pulled:", response.data);
            setAlertData(response.data);//list of alerts
        })
        .catch(error => {
            console.error('Error pulling Alert:', error);         
        })


    }, [user_id, apiLink]);

    const handleTaken = (id) => {
        setAlert_id(id);
        axios.post(apiLink + '/alertcompleted', {alert_id: id})
        .then(response => {
            console.log("Alert successfuly archeved:", response.data);
            window.location.reload();   
        })
        .catch(error => {
            console.error('Error archeving Alert:', error);         
        })
    }

    let convertTime = (inputTime) => {
        let utcDate = new Date(inputTime);
        let pacificDate = new Date(utcDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        let date = pacificDate.toLocaleDateString();
        let time = pacificDate.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
        return(
            <div>
                <p>Date: {date} Time: {time}</p>
            </div>
        );
    }

    return (
        <div className="reminder-page">
            <h1>Notifications</h1>
            <form className="notification-form" onSubmit={handleTaken}>
                {alertData.map((reminder) => (
                    <div className="notification-box" key={reminder.id}>
                        <div className="notification-data">
                            <strong>{reminder.med_name}</strong>
                            <div className="notification-info">
                                <p>Dose amount: {reminder.dose_amt}</p>
                                {convertTime(reminder.send_time)}
                            </div>
                        </div>
                        <button type="button" onClick={() => handleTaken(reminder.id)}>Taken</button>
                    </div>
                ))}
            </form>
        </div>
    );
    
};

export default Reminders;