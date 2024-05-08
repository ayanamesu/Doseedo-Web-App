import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Cookies from 'js-cookie';
import { fas } from "@fortawesome/free-solid-svg-icons";


const EmergencyContact = () => {
 
     
 
    const [hasEmergencyContact, setEmergencyContact] = useState(false);
    
    const [userId, setUserId] = useState("");
    let navigate = useNavigate();   
    const [contactInfo, setContactInfo] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: ""
    });

  
    useEffect(() => {
        if (Cookies.get('user_id') && Cookies.get('session_id')) {
            setUserId(Cookies.get('user_id'));
           // console.log("User id has been set!" + user_id)
        } else {
            alert("You need to relog in!")
            navigate('/');
        }
        const data = {
            user_id: userId,
            ...contactInfo

        };
        axios.post('http://localhost:8000/emergencycontact', data )
        // axios.post('http://ec2-3-144-15-61.us-east-2.compute.amazonaws.com/addEmergencyContact', data )
            .then((res) => {
    
            console.log(res.data);
            console.log(res.status);
            setContactInfo(res.data.at(0));
            setEmergencyContact(true);//emegencylist exist

            })
            .catch((error) => {
                console.error('Error adding emergency contact:', error);
                setEmergencyContact(false);//no emrgency list
            });

    //api for view medicine

}, [userId]);
        //move outside to a callable function
        const addEmergencyContact = async (contactInfo) =>{
            
            

            axios.post('http://localhost:8000/emergencycontact/add',contactInfo )
            // axios.post('http://ec2-3-144-15-61.us-east-2.compute.amazonaws.com/addEmergencyContact', data )
                .then((res) => {
                console.log("we are here");
                console.log(res.data);
                console.log(res.status);
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
