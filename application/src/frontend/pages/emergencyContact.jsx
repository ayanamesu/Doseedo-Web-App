import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';

const EmergencyContact = ({apiLink}) => {
    let navigate = useNavigate(); 
    const [hasEmergencyContact, setEmergencyContact] = useState(false);
    const [userId, setUserId] = useState("");  
    const [contactInfo, setContactInfo] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: ""
    });
  
    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
        } else {
            alert("You need to relog in!")
            navigate('/');
        }

        const data = {
            user_id: userId,
            ...contactInfo
        };

        axios.post(apiLink + '/emergencycontact', data )
            .then((res) => {
                setContactInfo(res.data.at(0));
                setEmergencyContact(true);
            })
            .catch((error) => {
                console.error('Error adding emergency contact:', error);
                setEmergencyContact(false);
            });
    }, [userId]);

        //move outside to a callable function
        const addEmergencyContact = async (contactInfo) =>{
            axios.post(apiLink + '/emergencycontact/add', contactInfo)
                .then((res) => {
                    if (res.status === 201) {
                        alert("Successfully edited emergency contact");
                    } else {
                        alert("An error has occured with editing your emergency contact");
                    }
                })
                .catch((error) => {
                    console.error('Error adding emergency contact:', error);
                });
        }
            
    const handleContactSubmit = (e) => {
        e.preventDefault();
        const first_name = document.getElementById("fname-input").value;
        const last_name = document.getElementById("lname-input").value;
        const phone = document.getElementById("phone-input").value;
        const email = document.getElementById("email-input").value;
        const newContactInfo = {user_id: userId, first_name: first_name, last_name:last_name, phone: phone, email: email};
        setContactInfo(newContactInfo);
        addEmergencyContact(newContactInfo);    
        setEmergencyContact(true);
    };

    return (
        <div className='emergencyContact-Page'>
            <h1>Emergency Contact</h1>
            {hasEmergencyContact ? (
                <div className="emergency-contact-form">
                    <h2>Name: {contactInfo.first_name} {contactInfo.last_name}</h2>
                    <h3>Phone: {contactInfo.phone}</h3>
                    <h3>Email: {contactInfo.email}</h3>
                    <button onClick={() => setEmergencyContact(false)}>Edit</button>
                </div>
            ) : (
                <form className="emergency-contact-form" onSubmit={handleContactSubmit}>
                    <p>Enter your emergency contact information:</p>
                    <input type="text" placeholder="First Name" id="fname-input" name="fname" />
                    <input type="text" placeholder="Last Name" id="lname-input" name="lname" />
                    <input type="text" placeholder="Phone Number" id="phone-input" name="phone" />
                    <input type="email" placeholder="Email" id="email-input" name="email" />
                    <button>Submit</button>
                </form>
            )}
        </div>
    );   
};

export default EmergencyContact;
