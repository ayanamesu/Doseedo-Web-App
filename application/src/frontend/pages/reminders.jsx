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


    }, [user_id]);
    const dummyData = [
        {
            med_name: "crack",
            med_id: 1,
            repeat: "daily",
            frequency: 1,
            dates: ["Everyday"],
            time: "08:00 am"
        },
        {
            med_name: "meth",
            med_id: 2,
            repeat: "weekly",
            frequency: 2,
            dates: ["2022-09-06", "2022-09-08"],
            time: "09:00 am"
        },
        {
            med_name: "weed",
            med_id: 3,
            repeat: "monthly",
            frequency: 1,
            dates: ["2022-09-15"],
            time: "10:00 pm"
        },
        {
            med_name: "legos",
            med_id: 4,
            repeat: "weekly",
            frequency: 3,
            dates: ["2022-09-07", "2022-09-09", "2022-09-11"],
            time: "11:00 am"
        },
        {
            med_name: "dookie",
            med_id: 5,
            repeat: "monthly",
            frequency: 2,
            dates: ["2022-09-10", "2022-09-20"],
            time: "12:00 pm"
        }
    ];
    const handleTaken = () => {
         
        axios.post(apiLink + '/alertcompleted', {alert_id: alert_id})
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
                                {/* <p>{reminder.dates.join(", ")} at: </p> */}
                                <p>{reminder.time}</p>
                            </div>
                        </div>
                        <button type="submit" id="submitButton">Taken</button>
                        {setAlert_id(reminder.id)}
                    </div>
                ))}
            </form>
        </div>
    );
    
};

export default Reminders;