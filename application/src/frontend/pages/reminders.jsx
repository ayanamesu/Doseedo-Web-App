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

    //Put into YYYY-MM-DD HH:MM (AM/PM) format
    let convertTime = (inputTime) => {
        let date = inputTime.slice(0, 10);
        let time = inputTime.slice(11, 16);

        const [hour, minute] = time.split(':').map(num => parseInt(num, 10));
        const period = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;

        const formattedTime = `${hour12}:${minute < 10 ? '0' : ''}${minute} ${period}`;

        return (
            <div>
                <p>Date: {date} Time: {formattedTime}</p>
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
                        <button type="submit" onClick={() => handleTaken(reminder.id)}>Taken</button>
                    </div>
                ))}
            </form>
        </div>
    );
    
};

export default Reminders;