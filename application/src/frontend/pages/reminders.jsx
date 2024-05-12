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
           // console.log("User id has been set!" + user_id)
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
        })
        .catch(error => {
            console.error('Error archeving Alert:', error);         
        })
    }

    return (
        <div className="reminder-page">
            <h1>Notifications</h1>
            <form className="edit-profile-form" onSubmit={handleTaken}>
                {alertData.map((reminder) => (
                    <div className="notification-box" key={reminder.id}>
                        <div className="notification-data">
                            <strong>{reminder.med_name}</strong>
                            <div className="notification-info">
                                <p>{reminder.repeat}:</p>
                                <p>{reminder.time}</p>
                            </div>
                        </div>
                        <button type="button" id="submitButton" onClick={() => handleTaken(reminder.id)}>Taken</button>
                    </div>
                ))}
            </form>
        </div>
    );
    
};

export default Reminders;